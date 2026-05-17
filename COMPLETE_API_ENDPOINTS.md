# RABBIT STORE - COMPLETE API ENDPOINT SPECIFICATION

## BASE URL
```
http://localhost:8080 (development)
https://api.rabbitstore.com (production)
```

---

## AUTHENTICATION ENDPOINTS

### 1. User Registration
```
POST /api/users/register
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}

Response (201 Created):
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Error (400 Bad Request):
{
  "message": "Email already exists",
  "error": "EMAIL_ALREADY_REGISTERED"
}
```

### 2. User Login
```
POST /api/users/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response (200 OK):
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Error (401 Unauthorized):
{
  "message": "Invalid email or password",
  "error": "INVALID_CREDENTIALS"
}
```

---

## PRODUCT ENDPOINTS

### 3. Get All Products (with filtering)
```
GET /api/products
Query Parameters:
  ?collection=Men&gender=Women&category=Top+Wear
  &size=M&color=Red&brand=Urban+Threads
  &material=Cotton&minPrice=10&maxPrice=100
  &sortBy=price&search=shirt&limit=8

Response (200 OK):
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Cotton T-Shirt",
    "description": "Comfortable cotton tee",
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
        "url": "https://cdn.example.com/products/tshirt.jpg",
        "altText": "Front view"
      }
    ],
    "isBestSeller": false
  },
  ...
]

Example Filter Combinations:
  /api/products?gender=Women&category=Top+Wear&limit=8
  /api/products?search=shirt
  /api/products?minPrice=20&maxPrice=80&sortBy=price
  /api/products?brand=Urban+Threads&material=Cotton
```

### 4. Get Product by ID
```
GET /api/products/:id

Path Parameters:
  id = "507f1f77bcf86cd799439012"

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Cotton T-Shirt",
  "description": "Comfortable cotton tee",
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
      "url": "https://cdn.example.com/products/tshirt-1.jpg",
      "altText": "Front view"
    },
    {
      "url": "https://cdn.example.com/products/tshirt-2.jpg",
      "altText": "Back view"
    }
  ],
  "isBestSeller": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}

Error (404 Not Found):
{
  "message": "Product not found",
  "error": "PRODUCT_NOT_FOUND"
}
```

### 5. Get Similar Products
```
GET /api/products/similar/:id

Path Parameters:
  id = "507f1f77bcf86cd799439012"

Response (200 OK):
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Polyester T-Shirt",
    "price": 39.99,
    "discountPrice": 29.99,
    "category": "Top Wear",
    "gender": "Women",
    ...
  },
  ...
]

Note: Similar products should match:
  - Same category
  - Same gender
  - Same or similar material/brand
```

### 6. Get Best Seller Product
```
GET /api/products/best-seller

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439099",
  "name": "Best Seller T-Shirt",
  "price": 59.99,
  "discountPrice": 44.99,
  "isBestSeller": true,
  ...
}

Error (404 Not Found):
{
  "message": "No best seller found",
  "error": "NO_BESTSELLER"
}
```

### 7. Create Product (Admin)
```
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "name": "New Cotton T-Shirt",
  "description": "Premium cotton t-shirt",
  "price": 59.99,
  "discountPrice": 44.99,
  "category": "Top Wear",
  "gender": "Women",
  "sku": "TSHIRT-WOMEN-NEW",
  "colors": ["Red", "Blue", "Black", "White"],
  "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
  "material": ["Cotton"],
  "brand": "Urban Threads",
  "collection": "Women",
  "stock": 150,
  "images": [
    {
      "url": "https://cdn.example.com/products/new-tshirt-1.jpg",
      "altText": "Front view"
    }
  ]
}

Response (201 Created):
{
  "_id": "507f1f77bcf86cd799439100",
  "name": "New Cotton T-Shirt",
  ...
  "createdAt": "2024-01-20T15:45:00Z"
}

Error (403 Forbidden):
{
  "message": "Admin access required",
  "error": "ADMIN_ACCESS_REQUIRED"
}

Error (409 Conflict):
{
  "message": "SKU already exists",
  "error": "SKU_ALREADY_EXISTS"
}
```

### 8. Update Product (Admin)
```
PUT /api/products/:id
Authorization: Bearer {token}
Content-Type: application/json

Path Parameters:
  id = "507f1f77bcf86cd799439012"

Request Body (can be partial):
{
  "price": 54.99,
  "discountPrice": 40.99,
  "stock": 120,
  "isBestSeller": true
}

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Cotton T-Shirt",
  "price": 54.99,
  "discountPrice": 40.99,
  "stock": 120,
  "isBestSeller": true,
  "updatedAt": "2024-01-20T16:00:00Z"
}

Error (403 Forbidden):
{
  "message": "Admin access required",
  "error": "ADMIN_ACCESS_REQUIRED"
}
```

### 9. Delete Product (Admin)
```
DELETE /api/products/:id
Authorization: Bearer {token}

Path Parameters:
  id = "507f1f77bcf86cd799439012"

Response (200 OK):
{
  "message": "Product deleted successfully"
}

Error (403 Forbidden):
{
  "message": "Admin access required",
  "error": "ADMIN_ACCESS_REQUIRED"
}
```

---

## CART ENDPOINTS

### 10. Get Cart
```
GET /api/cart
Query Parameters:
  ?userId=507f1f77bcf86cd799439011&guestId=guest_1234567890

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439050",
  "userId": "507f1f77bcf86cd799439011",
  "guestId": null,
  "products": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "name": "Cotton T-Shirt",
      "image": "https://cdn.example.com/products/tshirt.jpg",
      "price": 34.99,
      "quantity": 2,
      "size": "M",
      "color": "Red"
    }
  ],
  "totalPrice": 69.98
}

Note: Pass either userId or guestId
```

### 11. Add to Cart
```
POST /api/cart
Content-Type: application/json

Request Body:
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 2,
  "size": "M",
  "color": "Red",
  "userId": "507f1f77bcf86cd799439011",
  "guestId": null
}

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439050",
  "products": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "name": "Cotton T-Shirt",
      "image": "https://cdn.example.com/products/tshirt.jpg",
      "price": 34.99,
      "quantity": 2,
      "size": "M",
      "color": "Red"
    }
  ],
  "totalPrice": 69.98
}

Error (404 Not Found):
{
  "message": "Product not found",
  "error": "PRODUCT_NOT_FOUND"
}

Note: If same product with same size/color exists, update quantity instead of adding new
```

### 12. Update Cart Item Quantity
```
PUT /api/cart
Content-Type: application/json

Request Body:
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 5,
  "size": "M",
  "color": "Red",
  "userId": "507f1f77bcf86cd799439011",
  "guestId": null
}

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439050",
  "products": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "name": "Cotton T-Shirt",
      "image": "https://cdn.example.com/products/tshirt.jpg",
      "price": 34.99,
      "quantity": 5,
      "size": "M",
      "color": "Red"
    }
  ],
  "totalPrice": 174.95
}
```

### 13. Remove from Cart
```
DELETE /api/cart
Content-Type: application/json

Request Body:
{
  "productId": "507f1f77bcf86cd799439012",
  "size": "M",
  "color": "Red",
  "userId": "507f1f77bcf86cd799439011",
  "guestId": null
}

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439050",
  "products": [],
  "totalPrice": 0
}
```

### 14. Merge Cart (Guest to User)
```
POST /api/cart/merge
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "guestId": "guest_1234567890",
  "userId": "507f1f77bcf86cd799439011"
}

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439050",
  "userId": "507f1f77bcf86cd799439011",
  "guestId": null,
  "products": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "name": "Cotton T-Shirt",
      "quantity": 3,
      "size": "M",
      "color": "Red",
      "price": 34.99
    }
  ],
  "totalPrice": 104.97
}

Note: Merges guest cart into user cart; duplicates are combined by quantity
```

---

## CHECKOUT ENDPOINTS

### 15. Create Checkout
```
POST /api/checkout
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "checkoutItems": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 2,
      "price": 34.99,
      "size": "M",
      "color": "Red"
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main Street",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA",
    "phone": "+1-212-555-0123"
  },
  "paymentMethod": "Paypal",
  "totalPrice": 69.98
}

Response (201 Created):
{
  "_id": "507f1f77bcf86cd799439060",
  "userId": "507f1f77bcf86cd799439011",
  "checkoutItems": [...],
  "shippingAddress": {...},
  "paymentMethod": "Paypal",
  "paymentStatus": "pending",
  "totalPrice": 69.98,
  "createdAt": "2024-01-20T17:30:00Z"
}

Error (401 Unauthorized):
{
  "message": "Must be logged in to checkout",
  "error": "UNAUTHORIZED"
}
```

### 16. Update Checkout Payment Status
```
PUT /api/checkout/:id/pay
Authorization: Bearer {token}
Content-Type: application/json

Path Parameters:
  id = "507f1f77bcf86cd799439060"

Request Body:
{
  "paymentStatus": "paid",
  "paymentDetails": {
    "transactionId": "PAY-ABC123XYZ",
    "payerEmail": "user@example.com",
    "paymentTime": "2024-01-20T17:35:00Z"
  }
}

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439060",
  "paymentStatus": "paid",
  "paymentDetails": {...},
  "updatedAt": "2024-01-20T17:35:00Z"
}

Error (404 Not Found):
{
  "message": "Checkout not found",
  "error": "CHECKOUT_NOT_FOUND"
}
```

### 17. Finalize Checkout to Order
```
POST /api/checkout/:id/finalize
Authorization: Bearer {token}
Content-Type: application/json

Path Parameters:
  id = "507f1f77bcf86cd799439060"

Request Body:
{}

Response (201 Created):
{
  "_id": "507f1f77bcf86cd799439070",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "orderItems": [...],
  "shippingAddress": {...},
  "paymentMethod": "Paypal",
  "totalPrice": 69.98,
  "isPaid": true,
  "paidAt": "2024-01-20T17:35:00Z",
  "status": "Processing",
  "createdAt": "2024-01-20T17:36:00Z"
}

Note: This endpoint should:
1. Create Order from Checkout
2. Clear user's cart
3. Delete/invalidate the Checkout session
```

---

## ORDER ENDPOINTS

### 18. Get User's Orders
```
GET /api/orders/my-orders
Authorization: Bearer {token}

Response (200 OK):
[
  {
    "_id": "507f1f77bcf86cd799439070",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "orderItems": [
      {
        "productId": "507f1f77bcf86cd799439012",
        "name": "Cotton T-Shirt",
        "image": "https://cdn.example.com/products/tshirt.jpg",
        "price": 34.99,
        "quantity": 2,
        "size": "M",
        "color": "Red"
      }
    ],
    "shippingAddress": {
      "city": "New York",
      "country": "USA"
    },
    "totalPrice": 69.98,
    "isPaid": true,
    "status": "Processing",
    "createdAt": "2024-01-20T17:36:00Z"
  }
]

Error (401 Unauthorized):
{
  "message": "Authentication required",
  "error": "UNAUTHORIZED"
}
```

### 19. Get Order Details
```
GET /api/orders/:id
Authorization: Bearer {token}

Path Parameters:
  id = "507f1f77bcf86cd799439070"

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439070",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "orderItems": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "name": "Cotton T-Shirt",
      "image": "https://cdn.example.com/products/tshirt.jpg",
      "price": 34.99,
      "quantity": 2,
      "size": "M",
      "color": "Red"
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main Street",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA",
    "phone": "+1-212-555-0123"
  },
  "paymentMethod": "Paypal",
  "totalPrice": 69.98,
  "isPaid": true,
  "paidAt": "2024-01-20T17:35:00Z",
  "status": "Processing",
  "createdAt": "2024-01-20T17:36:00Z",
  "updatedAt": "2024-01-20T17:36:00Z"
}
```

---

## ADMIN ENDPOINTS

### 20. Get All Users (Admin)
```
GET /api/admin/users
Authorization: Bearer {admin-token}

Response (200 OK):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2024-01-15T10:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Admin",
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "2024-01-10T08:00:00Z"
  }
]

Error (403 Forbidden):
{
  "message": "Admin access required",
  "error": "ADMIN_ACCESS_REQUIRED"
}
```

### 21. Add User (Admin)
```
POST /api/admin/users
Authorization: Bearer {admin-token}
Content-Type: application/json

Request Body:
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "role": "customer"
}

Response (201 Created):
{
  "_id": "507f1f77bcf86cd799439099",
  "name": "New User",
  "email": "newuser@example.com",
  "role": "customer",
  "createdAt": "2024-01-21T10:00:00Z"
}
```

### 22. Update User (Admin)
```
PUT /api/admin/users/:id
Authorization: Bearer {admin-token}
Content-Type: application/json

Path Parameters:
  id = "507f1f77bcf86cd799439011"

Request Body:
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "admin"
}

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "admin",
  "updatedAt": "2024-01-21T11:00:00Z"
}
```

### 23. Delete User (Admin)
```
DELETE /api/admin/users/:id
Authorization: Bearer {admin-token}

Path Parameters:
  id = "507f1f77bcf86cd799439011"

Response (200 OK):
{
  "message": "User deleted successfully"
}
```

### 24. Get All Orders (Admin)
```
GET /api/admin/orders
Authorization: Bearer {admin-token}

Response (200 OK):
[
  {
    "_id": "507f1f77bcf86cd799439070",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "totalPrice": 69.98,
    "isPaid": true,
    "status": "Processing",
    "createdAt": "2024-01-20T17:36:00Z"
  }
]
```

### 25. Update Order Status (Admin)
```
PUT /api/admin/orders/:id
Authorization: Bearer {admin-token}
Content-Type: application/json

Path Parameters:
  id = "507f1f77bcf86cd799439070"

Request Body:
{
  "status": "Shipped"
}

Valid Status Values:
  "Processing"
  "Shipped"
  "Delivered"
  "Cancelled"

Response (200 OK):
{
  "_id": "507f1f77bcf86cd799439070",
  "status": "Shipped",
  "updatedAt": "2024-01-21T12:00:00Z"
}
```

### 26. Delete Order (Admin)
```
DELETE /api/admin/orders/:id
Authorization: Bearer {admin-token}

Path Parameters:
  id = "507f1f77bcf86cd799439070"

Response (200 OK):
{
  "message": "Order deleted successfully"
}
```

---

## AUTHENTICATION HEADERS

All requests require:
```
Content-Type: application/json
```

Protected endpoints require:
```
Authorization: Bearer {jwt_token}
```

Example with curl:
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Next requests with token:
curl -X GET http://localhost:8080/api/orders/my-orders \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

## QUERY PARAMETER REFERENCE

### Product Filtering Query Parameters
```
?collection=Men              (string)
?gender=Women               (string: Men | Women)
?category=Top+Wear          (string: Top Wear | Bottom Wear)
?size=M,L,XL                (comma-separated)
?color=Red,Blue             (comma-separated)
?brand=Urban+Threads        (string)
?material=Cotton,Polyester  (comma-separated)
?minPrice=10                (number)
?maxPrice=100               (number)
?sortBy=price               (string: price | name | newest)
?search=shirt               (string)
?limit=8                    (number: page size)
```

### Multiple Filter Example
```
GET /api/products?gender=Women&category=Top+Wear&minPrice=20&maxPrice=80&color=Red,Blue&size=M,L&sortBy=price&limit=12
```

---

**Use this complete endpoint specification with your Spring Boot development!**
