# RABBIT STORE - Frontend Application Analysis & Backend Specification Guide

## 1. PROJECT OVERVIEW

**Application Name:** Rabbit Store (E-commerce Fashion Platform)
**Frontend Stack:** React 19 + Redux Toolkit + Tailwind CSS + Vite
**Backend Required:** Spring Boot (Java)
**Payment Gateway:** PayPal Integration
**State Management:** Redux with async thunks
**UI Framework:** Tailwind CSS + React Icons
**Toast Notifications:** Sonner

---

## 2. APPLICATION ARCHITECTURE

### 2.1 High-Level Flow
```
User
  ├── Authentication (Login/Register)
  ├── Shopping (Browse → Filter → Select → Add to Cart)
  ├── Payment (PayPal)
  ├── Order Management
  └── User Profile

Admin
  ├── Dashboard (Analytics)
  ├── User Management (CRUD)
  ├── Product Management (CRUD)
  └── Order Management (Status Updates)
```

---

## 3. ROUTES & PAGES

### 3.1 User Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page with featured products, best sellers |
| `/login` | Login | User authentication with email/password |
| `/register` | Register | New user registration |
| `/profile` | Profile | User profile with logout & order history |
| `/collections/:collection` | Collections | Filter & browse products by category |
| `/product/:id` | ProductDetails | Detailed product view with add-to-cart |
| `/checkout` | Checkout | Shipping address + payment method selection |
| `/order-confirmation` | OrderConfirmation | Order confirmation page post-payment |
| `/order/:id` | OrderDetails | Detailed order information |
| `/my-orders` | MyOrders | List of user's orders |

### 3.2 Admin Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin` | AdminDashboard | Dashboard with analytics |
| `/admin/users` | UserManagement | CRUD operations for users |
| `/admin/products` | ProductManagement | CRUD for products with edit/delete |
| `/admin/products/:id/edit` | EditProductPage | Edit product details |
| `/admin/orders` | OrderManagement | Manage & update order statuses |

---

## 4. REDUX STATE MANAGEMENT

### 4.1 Redux Store Structure
```
store = {
  auth: {
    user: null,           // Logged-in user object
    guestId: string,      // Guest identifier for cart tracking
    loading: boolean,
    error: string
  },
  products: {
    products: [],         // Filtered/searched products
    selectedProduct: {},  // Current product being viewed
    similarProducts: [],  // Related products
    loading: boolean,
    error: string,
    filters: {            // Active filters
      category, size, color, gender, brand,
      minPrice, maxPrice, sortBy, search, material, collection
    }
  },
  cart: {
    cart: {
      products: [],       // Array of cart items
      totalPrice: number
    },
    loading: boolean,
    error: string
  },
  checkout: {
    checkout: {},         // Current checkout session
    loading: boolean,
    error: string
  },
  orders: {
    orders: [],           // User's orders
    orderDetails: {},     // Selected order details
    totalOrders: number,
    loading: boolean,
    error: string
  },
  admin: {
    users: [],            // All users (admin only)
    loading: boolean,
    error: string
  },
  adminProducts: {
    products: [],         // All products (admin only)
    loading: boolean,
    error: string
  },
  adminOrders: {
    orders: [],           // All orders (admin only)
    totalOrders: number,
    totalSales: number,
    loading: boolean,
    error: string
  }
}
```

---

## 5. DATA MODELS & API ENDPOINTS

### 5.1 User Model
```javascript
{
  _id: ObjectId,
  name: string,
  email: string (unique),
  password: string (hashed),
  role: "customer" | "admin",
  createdAt: timestamp,
  updatedAt: timestamp
}

API Endpoints:
- POST   /api/users/register    → Register new user
- POST   /api/users/login       → Login with email/password
- GET    /api/users             → Get user profile (requires auth)
- PUT    /api/users/:id         → Update user profile
- DELETE /api/users/:id         → Delete user account
```

### 5.2 Product Model
```javascript
{
  _id: ObjectId,
  name: string,
  description: string,
  price: number,
  discountPrice: number,
  category: "Top Wear" | "Bottom Wear",
  gender: "Men" | "Women",
  sku: string (unique),
  colors: [string],           // e.g., ["Red", "Blue", "Black"]
  sizes: [string],            // e.g., ["XS", "S", "M", "L", "XL", "XXL"]
  material: [string],         // e.g., ["Cotton", "Polyester", "Wool"]
  brand: string,              // e.g., "Urban Threads"
  collection: string,         // For product grouping
  stock: number,              // Available quantity
  images: [
    {
      url: string,
      altText: string
    }
  ],
  isBestSeller: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}

API Endpoints:
- GET    /api/products                    → Get all products (with filters)
- GET    /api/products?collection=...     → Filter by collection
- GET    /api/products?gender=...         → Filter by gender
- GET    /api/products?category=...       → Filter by category
- GET    /api/products?minPrice=...&maxPrice=... → Price range
- GET    /api/products?search=...         → Search products
- GET    /api/products?sortBy=...         → Sort (e.g., price, name)
- GET    /api/products/:id                → Get product details
- GET    /api/products/similar/:id        → Get similar products
- GET    /api/products/best-seller        → Get best-selling product
- POST   /api/products                    → Create product (admin)
- PUT    /api/products/:id                → Update product (admin)
- DELETE /api/products/:id                → Delete product (admin)

Query Parameters Examples:
?collection=Men&category=Top+Wear&minPrice=10&maxPrice=100&sortBy=price&limit=8
```

### 5.3 Cart Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (nullable for guests),
  guestId: string,
  products: [
    {
      productId: ObjectId,
      name: string,
      image: string,
      price: number,
      quantity: number,
      size: string,
      color: string,
      colour: string  // (note: inconsistency in frontend)
    }
  ],
  totalPrice: number,
  createdAt: timestamp,
  updatedAt: timestamp
}

API Endpoints:
- GET    /api/cart?userId=...&guestId=...           → Fetch cart
- POST   /api/cart                                   → Add item to cart
- PUT    /api/cart                                   → Update item quantity
- DELETE /api/cart                                   → Remove item from cart
- POST   /api/cart/merge                             → Merge guest cart to user cart (on login)
```

### 5.4 Checkout Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  checkoutItems: [
    {
      productId: ObjectId,
      quantity: number,
      price: number,
      size: string,
      color: string
    }
  ],
  shippingAddress: {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    phone: string
  },
  paymentMethod: "Paypal" | "CreditCard",
  paymentStatus: "pending" | "paid",
  paymentDetails: {},         // PayPal transaction details
  totalPrice: number,
  createdAt: timestamp,
  updatedAt: timestamp
}

API Endpoints:
- POST   /api/checkout                      → Create checkout session
- PUT    /api/checkout/:id/pay              → Mark payment as paid
- POST   /api/checkout/:id/finalize         → Finalize checkout (create order)
```

### 5.5 Order Model
```javascript
{
  _id: ObjectId,
  user: {
    _id: ObjectId,
    name: string,
    email: string
  },
  orderItems: [
    {
      productId: ObjectId,
      name: string,
      image: string,
      price: number,
      quantity: number,
      size: string,
      color: string
    }
  ],
  shippingAddress: {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    phone: string
  },
  paymentMethod: "Paypal",
  totalPrice: number,
  isPaid: boolean,
  paidAt: timestamp,
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled",
  createdAt: timestamp,
  updatedAt: timestamp
}

API Endpoints:
- GET    /api/orders/my-orders              → Get user's orders (requires auth)
- GET    /api/orders/:id                    → Get order details (requires auth)
- GET    /api/admin/orders                  → Get all orders (admin only)
- PUT    /api/admin/orders/:id              → Update order status (admin only)
- DELETE /api/admin/orders/:id              → Delete order (admin only)
```

---

## 6. AUTHENTICATION & AUTHORIZATION

### 6.1 Authentication Flow
```
1. User submits login/register form
2. Frontend calls POST /api/users/login or POST /api/users/register
3. Backend validates & returns { user: {...}, token: "jwt_token" }
4. Frontend stores in localStorage:
   - userInfo: User object (JSON)
   - userToken: JWT token
   - guestId: For cart tracking
5. All subsequent requests include:
   Authorization: Bearer {token}
```

### 6.2 User Roles
- **customer**: Regular user, can browse, cart, checkout, view own orders
- **admin**: Can manage users, products, and all orders

### 6.3 Protected Routes
- `/profile` - requires login
- `/checkout` - requires login
- `/my-orders` - requires login
- `/admin/*` - requires admin role

---

## 7. KEY FEATURES

### 7.1 User Features
✅ **Authentication**
- User registration with email & password
- User login
- Logout with cart clearing
- JWT token-based authentication

✅ **Product Browsing**
- View all products with pagination
- Filter by: collection, gender, category, size, color, brand, material
- Price range filtering (minPrice, maxPrice)
- Search products by name
- Sort products (by price, popularity, etc.)
- View product details with multiple images
- View similar products on product page

✅ **Shopping Cart**
- Add/remove items from cart
- Update item quantity
- Select size & color variants
- View total cart price
- Guest cart tracking (guestId)
- Cart merging on login (guest → user)
- Cart persistence in localStorage & backend

✅ **Checkout & Payment**
- Shipping address form (firstName, lastName, address, city, postalCode, country, phone)
- PayPal integration
- Order creation after successful payment
- Order confirmation page

✅ **Order Management**
- View all user orders
- View order details (items, status, date, total)
- Order status display (Paid/Not Paid)
- Shipping address in order

✅ **User Profile**
- View profile information (name, email)
- View order history
- Logout functionality

### 7.2 Admin Features
✅ **Dashboard**
- Total revenue calculation
- Total orders count
- Total products count
- Recent orders table
- Quick links to management sections

✅ **User Management**
- Add new user (with role assignment)
- Update user (name, email, role)
- Delete user
- List all users

✅ **Product Management**
- Create new product
- Edit product details
- Delete product
- View all products in table

✅ **Order Management**
- View all orders
- Update order status (Processing → Shipped → Delivered, Cancelled)
- Delete orders
- Quick action: Mark as Delivered button

---

## 8. FRONTEND COMPONENT STRUCTURE

### 8.1 Layout Components
- `Header.jsx` - Top navigation bar
- `TopBar.jsx` - Announcements/info bar
- `Navbar.jsx` - Main navigation with menu drawer
- `Footer.jsx` - Footer section
- `UserLayout.jsx` - Main layout wrapper
- `AdminLayout.jsx` - Admin panel wrapper
- `CartDrawer.jsx` - Slide-out cart panel
- `Hero.jsx` - Hero banner section

### 8.2 Product Components
- `ProductGrid.jsx` - Product listing grid
- `ProductDetails.jsx` - Single product details
- `ProductManagement.jsx` - Admin product CRUD
- `EditProductPage.jsx` - Edit product form
- `FilterSidebar.jsx` - Filter options panel
- `SortOptions.jsx` - Sort dropdown
- `GenderCollectionSection.jsx` - Gender-based collection
- `NewProducts.jsx` - New arrivals section
- `FeaturedCollection.jsx` - Featured items
- `FeaturesSection.jsx` - Features highlights

### 8.3 Cart Components
- `CartContents.jsx` - Cart items display
- `Checkout.jsx` - Checkout form & payment
- `Paypal.jsx` - PayPal button integration

### 8.4 Auth Components
- `Login.jsx` - Login form
- `Register.jsx` - Registration form
- `ProtectedRoute.jsx` - Route guard for admin/auth

### 8.5 Admin Components
- `AdminDashboard.jsx` - Admin overview
- `AdminLayout.jsx` - Admin layout wrapper
- `AdminSidebar.jsx` - Admin navigation
- `UserManagement.jsx` - User CRUD
- `ProductManagement.jsx` - Product CRUD
- `OrderManagement.jsx` - Order management

### 8.6 Other Components
- `Search.jsx` - Search functionality
- `MyOrders.jsx` - User orders list
- `OrderDetails.jsx` - Order detail view
- `OrderConfirmationPage.jsx` - Confirmation after payment
- `Profile.jsx` - User profile page
- `Collections.jsx` - Product collection page

---

## 9. TECHNOLOGIES & DEPENDENCIES

### 9.1 Core Dependencies
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.9.6",
  "@reduxjs/toolkit": "^2.11.2",
  "react-redux": "^9.2.0",
  "axios": "^1.13.2",
  "@paypal/react-paypal-js": "^8.9.2",
  "tailwindcss": "^4.1.17",
  "react-icons": "^5.5.0",
  "sonner": "^2.0.7"
}
```

### 9.2 Environment Variables
```
VITE_BACKEND_URL=http://localhost:8080  (or production URL)
```

---

## 10. IMPORTANT IMPLEMENTATION NOTES

### 10.1 Guest to User Conversion
- Guests are tracked using `guestId` generated on app load
- When guest logs in, cart items are merged to user account
- After merge, guest cart is cleared

### 10.2 Cart Tracking
- Cart is stored in both localStorage (frontend) and backend database
- Cart can belong to userId (authenticated) or guestId (guest)
- Each product in cart has unique key: `productId + size + color`

### 10.3 Product Filtering
- Filters are URL-based query parameters (state persists on refresh)
- Multiple values for same filter are comma-separated
- Example: `?size=M,L&color=Red,Blue&minPrice=10&maxPrice=100`

### 10.4 Payment Flow
1. Create checkout session (POST /api/checkout)
2. PayPal processing (client-side)
3. Mark checkout as paid (PUT /api/checkout/:id/pay)
4. Finalize to create order (POST /api/checkout/:id/finalize)
5. Clear cart after successful order

### 10.5 Admin Protection
- Admin routes check `user.role === "admin"`
- ProtectedRoute component guards against unauthorized access
- All admin API calls include Bearer token in Authorization header

### 10.6 Error Handling
- Redux thunks return `rejectWithValue(err.response.data)`
- Frontend uses toast notifications (Sonner) for errors
- Error state persists in Redux slices

---

## 11. FRONTEND-BACKEND CONTRACT (API REQUEST/RESPONSE)

### 11.1 Request Headers
```javascript
Standard Headers:
- Content-Type: application/json
- Authorization: Bearer {jwt_token}  (for protected endpoints)

Example from ProductDetails.jsx:
headers: {
  Authorization: `Bearer ${localStorage.getItem("userToken")}`
}
```

### 11.2 Authentication Endpoints
```javascript
POST /api/users/register
Request: { email, password, name (optional) }
Response: { user: {...}, token: "jwt_token" }

POST /api/users/login
Request: { email, password }
Response: { user: {...}, token: "jwt_token" }
```

### 11.3 Product Endpoints
```javascript
GET /api/products
Query params: collection, gender, category, size, color, brand, material, 
             minPrice, maxPrice, sortBy, search, limit

Response: Array of products (or single product object)
Example: [
  {
    _id: "123",
    name: "T-Shirt",
    price: 50,
    discountPrice: 35,
    colors: ["Red", "Blue"],
    sizes: ["M", "L"],
    images: [{url: "...", altText: "..."}],
    ...
  }
]
```

### 11.4 Cart Endpoints
```javascript
POST /api/cart
Body: { productId, quantity, size, color, guestId, userId }
Response: { products: [...], totalPrice: 150 }

PUT /api/cart
Body: { productId, quantity, size, color, guestId, userId }
Response: { products: [...], totalPrice: 150 }

DELETE /api/cart
Body: { productId, guestId, userId, size, color }
Response: { products: [...], totalPrice: 150 }
```

### 11.5 Order Endpoints
```javascript
POST /api/checkout
Body: {
  checkoutItems: [...],
  shippingAddress: {...},
  paymentMethod: "Paypal",
  totalPrice: 100
}
Response: { _id: "checkout123", ... }

PUT /api/checkout/:id/pay
Body: { paymentStatus: "paid", paymentDetails: {...} }
Response: { _id: "checkout123", paymentStatus: "paid", ... }

POST /api/checkout/:id/finalize
Body: {}
Response: { _id: "order123", ... }
```

---

## 12. FILTER OPTIONS AVAILABLE

### Product Filters (from FilterSidebar.jsx)
```javascript
Categories: ["Top Wear", "Bottom Wear"]
Colors: ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"]
Sizes: ["XS", "S", "M", "L", "XL", "XXL"]
Materials: ["Cotton", "Polyester", "Wool", "Silk", "Denim", "Leather", "Viscose", "Fleece"]
Gender: ["Men", "Women"]
Brands: ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChickStyle"]
Price Range: 0-100 (adjustable slider)
```

---

## 13. COMMON BUG FIXES NEEDED IN BACKEND

1. **Cart Color Field**: Frontend uses both "color" and "colour" - standardize on backend
2. **Similar Products**: Ensure similarity is based on category/gender/material
3. **Best Seller Logic**: Implement logic for `isBestSeller` or use order count
4. **Pagination**: ProductGrid doesn't show pagination but limit is sent
5. **Price Filtering**: Backend needs to filter correctly by minPrice/maxPrice
6. **Status Values**: Order status values must match exactly: "Processing", "Shipped", "Delivered", "Cancelled"

---

## 14. TESTING SCENARIOS FOR BACKEND

### User Flow Testing
1. Register new user → Should return user + token
2. Login with valid credentials → Should return user + token
3. Login with invalid credentials → Should return error
4. Browse products without login → Should work (guest access)
5. Add item to cart as guest → Should work
6. Login → Should merge guest cart
7. Checkout → Should create checkout session
8. PayPal payment → Should mark as paid
9. Finalize → Should create order & clear cart
10. View my orders → Should show all user orders
11. Admin login → Should have role: "admin"
12. Admin dashboard → Should show stats
13. Admin edit product → Should update product
14. Admin manage orders → Should update order status

---

## 15. FRONTEND-BACKEND SETUP CHECKLIST

For Backend Developer:
```
✅ Database: MongoDB/PostgreSQL/MySQL
✅ ORM: Hibernate/Spring Data JPA
✅ API Framework: Spring Boot with REST
✅ Authentication: JWT with Bearer token
✅ CORS: Enable for frontend URL
✅ Password Hashing: Use BCrypt or similar
✅ Validation: Input validation on all endpoints
✅ Error Handling: Consistent error response format
✅ Logging: Implement proper logging
✅ Security: Validate admin role on all admin endpoints
✅ Testing: Unit tests & integration tests
✅ Documentation: Swagger/OpenAPI
```

---

## 16. SAMPLE API RESPONSE FORMATS

### Success Response
```json
{
  "user": {
    "_id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Error Response
```json
{
  "message": "Invalid email or password",
  "error": "INVALID_CREDENTIALS"
}
```

---

## 17. PRODUCTION DEPLOYMENT CONSIDERATIONS

1. Set `VITE_BACKEND_URL` to production Spring Boot API URL
2. Add environment-based configuration
3. Implement proper error logging/monitoring
4. Setup HTTPS
5. Configure CORS for production domain
6. Add rate limiting on backend
7. Implement request/response compression
8. Setup CI/CD pipeline
9. Add analytics tracking
10. Implement image CDN for product images
11. Cache frequently accessed products
12. Optimize database queries

---

## 18. POSSIBLE FUTURE ENHANCEMENTS

1. **Wishlist Feature** - Save favorite products
2. **Product Reviews** - User ratings & reviews
3. **Inventory Management** - Track stock levels
4. **Email Notifications** - Order confirmation emails
5. **User Address Book** - Save multiple addresses
6. **Discounts & Coupons** - Apply promo codes
7. **Analytics Dashboard** - Charts & graphs for admin
8. **Export Reports** - CSV/PDF export for orders/users
9. **Real-time Chat** - Customer support chat
10. **Mobile App** - React Native version

---

**Document Version:** 1.0
**Last Updated:** May 16, 2026
**For:** Spring Boot Backend Development

Use this document to brief ChatGPT, your development team, or any backend developer on the complete architecture and requirements!
