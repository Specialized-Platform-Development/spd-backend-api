# Online Marketplace Backend API

A production-ready RESTful backend API for an Online Marketplace application built with Node.js, Express.js, and MongoDB. This API supports authentication, user management, and product management with comprehensive security features.

## 🚀 Features

- **JWT Authentication** - Secure user authentication with JSON Web Tokens
- **User Management** - Complete CRUD operations for user profiles
- **Product Management** - Full marketplace product management
- **Input Validation** - Comprehensive request validation with clear error messages
- **Security** - Helmet.js security headers and CORS configuration
- **Error Handling** - Centralized error handling with standard response format
- **Password Security** - Bcrypt password hashing
- **RESTful Design** - Clean and intuitive API endpoints

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt, helmet, cors
- **Validation**: express-validator
- **Environment**: dotenv

## 📁 Project Structure

```
spd-backend-api/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── user.controller.js   # User management
│   │   └── product.controller.js # Product management
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Product.js           # Product schema
│   ├── routes/
│   │   ├── auth.routes.js       # Auth endpoints
│   │   ├── user.routes.js       # User endpoints
│   │   └── product.routes.js    # Product endpoints
│   ├── middlewares/
│   │   ├── auth.middleware.js   # JWT verification
│   │   ├── validation.middleware.js # Input validation
│   │   └── errorHandler.js      # Error handling
│   ├── utils/
│   │   └── responseHandler.js   # Standard responses
│   ├── app.js                   # Express app setup
│   └── server.js                # Server entry point
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore
└── package.json
```

## 🏗 System Architecture

The application follows the **Model-View-Controller (MVC)** pattern with clear separation of concerns:

### Architecture Layers

1. **Routes Layer** - Defines API endpoints and applies middleware
2. **Middleware Layer** - Handles authentication, validation, and error handling
3. **Controller Layer** - Contains business logic
4. **Model Layer** - Defines data schemas and database interactions
5. **Utility Layer** - Provides helper functions

### Data Flow

```
Client Request
    ↓
Route Handler
    ↓
Validation Middleware
    ↓
Authentication Middleware (if protected)
    ↓
Controller
    ↓
Model (Database)
    ↓
Response Handler
    ↓
Client Response
```

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Local Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd spd-backend-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your configuration:

   ```env
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/marketplace
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRES_IN=7d
   ```

4. **Start MongoDB** (if using local MongoDB)

   ```bash
   # macOS with Homebrew
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

5. **Run the application**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

6. **Verify the server is running**
   - Open browser: http://localhost:5001
   - Health check: http://localhost:5001/health

## 🌐 Deployment

### MongoDB Atlas Setup (Cloud Database)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string from "Connect" → "Connect your application"
6. Update your `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marketplace?retryWrites=true&w=majority
   ```

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference with examples.

### Quick Reference

#### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

#### User Endpoints

- `PUT /api/users/profile` - Update profile (protected)
- `DELETE /api/users/profile` - Delete account (protected)

#### Product Endpoints

- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get product by ID (public)
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

## 🔐 API Response Format

All API responses follow this standard format:

**Success Response:**

```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

## 🧪 Testing

### Using cURL

**Register a user:**

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Create a product (requires token):**

```bash
curl -X POST http://localhost:5001/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Product 1","description":"Description here","price":99.99,"stock":10}'
```

### Using Postman or Thunder Client

1. Import the API endpoints
2. Set up environment variables for base URL and token
3. Test each endpoint according to documentation

## 🤝 Contributing

This is an academic project for Lab Modules 1-5 integration.

## 📄 License

ISC

## 👤 Author

Created by Lanisa as part of Specialized Platform Development course.
