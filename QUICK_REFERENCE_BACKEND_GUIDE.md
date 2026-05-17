# RABBIT STORE - QUICK REFERENCE GUIDE FOR BACKEND DEVELOPERS

## 1. SYSTEM ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                     RABBIT STORE APPLICATION                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────┐          ┌──────────────────────────┐
│   REACT FRONTEND        │          │   SPRING BOOT BACKEND    │
│   (Vite + Redux)        │◄────────►│   (REST API)             │
│                         │          │                          │
│ • Auth/Login            │          │ • /api/users/*           │
│ • Product Browse        │          │ • /api/products/*        │
│ • Shopping Cart         │          │ • /api/cart/*            │
│ • Checkout (PayPal)     │          │ • /api/orders/*          │
│ • Order Tracking        │          │ • /api/checkout/*        │
│ • Admin Dashboard       │          │ • /api/admin/*           │
└─────────────────────────┘          │                          │
                                     │ • JWT Authentication     │
                                     │ • Role-Based Access      │
                                     └──────────────────────────┘
                                              ▲
                                              │
                                              ▼
                                     ┌──────────────────────┐
                                     │   DATABASE           │
                                     │ • Users              │
                                     │ • Products           │
                                     │ • Carts              │
                                     │ • Checkouts          │
                                     │ • Orders             │
                                     └──────────────────────┘
```

---

## 2. USER FLOW DIAGRAMS

### Registration & Login Flow
```
User Registration/Login
         │
         ▼
POST /api/users/register OR /api/users/login
         │
         ├─► Validate Email Format & Password
         │
         ├─► Hash Password (BCrypt)
         │
         ├─► Generate JWT Token (with userId, role)
         │
         └─► Response: { user, token }
              Frontend stores in localStorage:
              - userInfo (JSON)
              - userToken (JWT)
```

### Shopping Flow
```
Browse Products
         │
         ▼
GET /api/products?gender=Women&category=Top+Wear
         │
         ├─► Query by filters
         │
         └─► Return: Array<Product>
              Frontend displays with pagination
              
Select Product
         │
         ▼
GET /api/products/:id
         │
         └─► Return: Single Product with all details
         
Add to Cart
         │
         ▼
POST /api/cart
Body: {productId, quantity, size, color, guestId, userId}
         │
         ├─► Create/Update cart in database
         │
         └─► Return: Updated Cart { products, totalPrice }
```

### Checkout & Payment Flow
```
User Clicks Checkout
         │
         ▼
POST /api/checkout
Body: {checkoutItems, shippingAddress, paymentMethod, totalPrice}
         │
         ├─► Create Checkout session (pending)
         │
         └─► Response: { checkoutId, status: "pending" }
              Frontend passes to PayPal
              
PayPal Payment Processing
         │
         ├─► User approves payment
         │
         ▼
PUT /api/checkout/:id/pay
Body: {paymentStatus: "paid", paymentDetails: {...}}
         │
         ├─► Verify payment with PayPal (optional but recommended)
         │
         └─► Response: { checkoutId, paymentStatus: "paid" }
              
Finalize Checkout to Order
         │
         ▼
POST /api/checkout/:id/finalize
         │
         ├─► Create Order from Checkout
         │
         ├─► Clear user's cart
         │
         └─► Response: { orderId, status: "Processing" }
              Frontend redirects to confirmation
```

### Admin Management Flow
```
Admin Login (/api/users/login with admin role)
         │
         ├─────────────────────────┐
         ▼                         ▼
Get Dashboard Stats        Manage Resources
         │                         │
GET /api/admin/orders   ├─► Users: GET/POST/PUT/DELETE /api/admin/users/*
GET /api/admin/        │
         │              ├─► Products: GET/POST/PUT/DELETE /api/products/*
         │              │
         │              └─► Orders: GET/PUT/DELETE /api/admin/orders/*
         │
         └─► Return aggregated stats (totalRevenue, totalOrders, etc.)
```

---

## 3. DATABASE RELATIONSHIPS

```
┌─────────────┐         ┌──────────────┐
│    USER     │◄────────┤     ORDER    │
└─────────────┘         └──────────────┘
      ▲                         │
      │                         │
      │                    ┌────┴──────┐
      │                    │            │
      │                    ▼            ▼
      │              ┌─────────────┐  ┌───────────┐
      │              │ OrderItems  │  │ Shipping  │
      │              │ (Product    │  │ Address   │
      │              │ snapshot)   │  └───────────┘
      │              └─────────────┘
      │
      │
      ├───────────────────────┐
      │                       │
      ▼                       ▼
 ┌────────┐            ┌────────────┐
 │ CART   │            │ CHECKOUT   │
 │(userId)│            │(userId)    │
 └────────┘            └────────────┘
      │                       │
      ▼                       ▼
 ┌────────────────┐    ┌──────────────┐
 │ Product        │    │ Checkout     │
 │(reference)     │    │ Items        │
 │• productId     │    │• productId   │
 │• size, color   │    │• quantity    │
 │• quantity      │    │• price       │
 └────────────────┘    └──────────────┘
```

---

## 4. IMPORTANT CONSTANTS & ENUMS

### Order Status
```
Processing → Shipped → Delivered
OR
Processing → Cancelled
```

### User Roles
```
"customer"  (default)
"admin"     (elevated privileges)
```

### Payment Status
```
"pending"   (checkout created, payment pending)
"paid"      (PayPal payment received)
```

### Payment Method
```
"Paypal"    (currently only PayPal supported)
```

### Product Categories
```
"Top Wear"    (shirts, t-shirts, etc.)
"Bottom Wear" (pants, skirts, etc.)
```

### Genders
```
"Men"
"Women"
```

---

## 5. KEY IMPLEMENTATION DETAILS

### JWT Token Structure
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "userId": "user123",
  "email": "user@example.com",
  "role": "customer",
  "iat": 1234567890,
  "exp": 1234671490
}

Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)
```

### Cart Item Unique Identifier
```
Cart items are identified by combination of:
  productId + size + color

Example:
  Product 123, Size M, Color Red = UNIQUE item
  Product 123, Size L, Color Red = DIFFERENT item

This means user can add same product in different sizes/colors separately
```

### Price Calculation
```
Cart Total Price = Sum of (product.quantity * product.price) for all items

Order Total Price = Sum from checkout or cart at time of creation
```

### Guest to User Cart Merge
```
When guest logs in:
1. Find cart with guestId
2. Find cart with userId
3. Merge products:
   - If same product (productId + size + color):
     Update quantity (add guest quantity to user quantity)
   - If new product:
     Add to user's cart
4. Update totalPrice
5. Clear guest cart or mark for deletion
```

---

## 6. VALIDATION CHECKLIST

### User Registration/Login
```
✓ Email format validation (regex)
✓ Email uniqueness (no duplicates)
✓ Password strength (min 8 chars, special chars recommended)
✓ Required fields: email, password
✓ Name optional but recommended
```

### Product Creation/Update
```
✓ Product name required
✓ Price > 0
✓ Category must be "Top Wear" or "Bottom Wear"
✓ Gender must be "Men" or "Women"
✓ Colors/Sizes arrays not empty
✓ Images array not empty
✓ SKU uniqueness
```

### Cart Operations
```
✓ ProductId exists in database
✓ Quantity > 0
✓ Size exists in product.sizes
✓ Color exists in product.colors
✓ Either userId or guestId provided
✓ Check stock availability (optional but recommended)
```

### Checkout
```
✓ Cart has items (not empty)
✓ Shipping address fields complete
✓ Payment method valid ("Paypal")
✓ TotalPrice matches calculated price
✓ User authenticated (JWT valid)
```

### Order Updates (Admin)
```
✓ Only admin role can update
✓ Status is valid value (Processing, Shipped, Delivered, Cancelled)
✓ Order exists
```

---

## 7. ERROR HANDLING RESPONSES

### Format
```json
{
  "message": "User-friendly error message",
  "error": "TECHNICAL_ERROR_CODE"
}
```

### Common Error Cases
```
400 Bad Request
{
  "message": "Invalid email or password",
  "error": "INVALID_CREDENTIALS"
}

400 Bad Request
{
  "message": "Email already exists",
  "error": "EMAIL_ALREADY_REGISTERED"
}

401 Unauthorized
{
  "message": "Invalid or expired token",
  "error": "INVALID_TOKEN"
}

403 Forbidden
{
  "message": "Admin access required",
  "error": "ADMIN_ACCESS_REQUIRED"
}

404 Not Found
{
  "message": "Product not found",
  "error": "PRODUCT_NOT_FOUND"
}

500 Internal Server Error
{
  "message": "Something went wrong",
  "error": "INTERNAL_SERVER_ERROR"
}
```

---

## 8. DATABASE INDEXES (IMPORTANT FOR PERFORMANCE)

```sql
Users Table:
- CREATE UNIQUE INDEX idx_email ON users(email);
- CREATE INDEX idx_role ON users(role);

Products Table:
- CREATE UNIQUE INDEX idx_sku ON products(sku);
- CREATE INDEX idx_gender ON products(gender);
- CREATE INDEX idx_category ON products(category);
- CREATE INDEX idx_brand ON products(brand);
- CREATE INDEX idx_collection ON products(collection);

Orders Table:
- CREATE INDEX idx_userId ON orders(user_id);
- CREATE INDEX idx_status ON orders(status);
- CREATE INDEX idx_createdAt ON orders(created_at);

Carts Table:
- CREATE INDEX idx_userId ON carts(user_id);
- CREATE INDEX idx_guestId ON carts(guest_id);
```

---

## 9. SAMPLE TEST DATA

### Test User (Customer)
```json
{
  "name": "John Doe",
  "email": "customer@example.com",
  "password": "password123",
  "role": "customer"
}
```

### Test User (Admin)
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "adminpass123",
  "role": "admin"
}
```

### Test Product
```json
{
  "name": "Cotton T-Shirt",
  "description": "Comfortable 100% cotton t-shirt",
  "price": 49.99,
  "discountPrice": 34.99,
  "category": "Top Wear",
  "gender": "Women",
  "sku": "TSHIRT-WOMEN-001",
  "colors": ["Red", "Blue", "Black"],
  "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
  "material": ["Cotton"],
  "brand": "Urban Threads",
  "collection": "Women",
  "stock": 100,
  "images": [
    {
      "url": "https://example.com/images/tshirt-1.jpg",
      "altText": "Front view"
    }
  ],
  "isBestSeller": false
}
```

---

## 10. IMPLEMENTATION PRIORITY

### Phase 1 (Core)
1. User Registration & Login (JWT)
2. Product CRUD & Filtering
3. Cart Management
4. Order Creation

### Phase 2 (Admin)
1. Admin User Management
2. Order Status Updates
3. Admin Dashboard Stats

### Phase 3 (Payment)
1. Checkout Session
2. PayPal Integration
3. Order Finalization

### Phase 4 (Polish)
1. Input Validation
2. Error Handling
3. Testing & Documentation
4. Performance Optimization

---

## 11. SPRING BOOT PROJECT STRUCTURE

```
src/main/java/com/rabbitstore/
├── config/
│   ├── JwtConfig.java
│   ├── SecurityConfig.java
│   └── CorsConfig.java
├── controller/
│   ├── AuthController.java
│   ├── ProductController.java
│   ├── CartController.java
│   ├── CheckoutController.java
│   ├── OrderController.java
│   └── AdminController.java
├── service/
│   ├── UserService.java
│   ├── ProductService.java
│   ├── CartService.java
│   ├── CheckoutService.java
│   ├── OrderService.java
│   └── PaymentService.java
├── repository/
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   ├── CartRepository.java
│   ├── CheckoutRepository.java
│   └── OrderRepository.java
├── entity/
│   ├── User.java
│   ├── Product.java
│   ├── Cart.java
│   ├── Checkout.java
│   └── Order.java
├── dto/
│   ├── UserDTO.java
│   ├── ProductDTO.java
│   ├── CartDTO.java
│   └── OrderDTO.java
├── security/
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── CustomUserDetailsService.java
├── exception/
│   ├── ResourceNotFoundException.java
│   ├── UnauthorizedException.java
│   └── GlobalExceptionHandler.java
└── RabbitStoreApplication.java
```

---

## 12. POSTMAN COLLECTION QUICK REFERENCE

### Base URL
```
http://localhost:8080
```

### Common Headers
```
Content-Type: application/json
Authorization: Bearer {{token}}
```

### Environment Variables to Set
```
{{BASE_URL}} = http://localhost:8080
{{token}} = (JWT received from login)
{{productId}} = (ID from product creation)
{{guestId}} = (UUID or string)
{{orderId}} = (ID from order creation)
```

---

**Use this guide alongside the comprehensive FRONTEND_ANALYSIS_AND_BACKEND_SPECIFICATION.md document**

Both documents together provide complete information for building a production-level Spring Boot backend!
