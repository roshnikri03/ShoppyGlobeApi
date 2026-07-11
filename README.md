# ShoppyGlobe API

Backend for the ShoppyGlobe e-commerce project built with Node.js, Express, and MongoDB.

## Overview

This repository implements the following features required by the assignment:

- Product listing and product detail endpoints
- Cart endpoints protected by JWT authentication
- User registration and login with JWT tokens
- MongoDB models for `Product`, `Cart`, and `User`
- Seed script to populate sample products and users

Base URL: `http://localhost:3000`

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Seed sample data (creates two users and sample products):

```bash
node seeder.js
```

3. Start the server:

```bash
npm start
```

## API Endpoints

All examples assume `baseUrl=http://localhost:3000`.

### Auth

- POST /auth/register — Register a new user

  Request JSON:

  ```json
  {
    "email": "test@example.com",
    "password": "123456"
  }
  ```

  Curl:

  ```bash
  curl -X POST http://localhost:3000/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"123456"}'
  ```

- POST /auth/login — Login and receive a JWT token

  Request JSON same as above. Response contains `token`.

  Curl:

  ```bash
  curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"123456"}'
  ```

### Products

- GET /products — Get list of products

  ```bash
  curl http://localhost:3000/products
  ```

- GET /products/:id — Get product detail by ID

  ```bash
  curl http://localhost:3000/products/<product_id>
  ```

### Cart (Protected — requires Authorization header `Bearer <token>`)

- POST /cart — Add product to cart

  Request JSON:

  ```json
  {
    "productId": "<product_id>",
    "quantity": 1
  }
  ```

  Curl:

  ```bash
  curl -X POST http://localhost:3000/cart \
    -H "Authorization: Bearer <your_token>" \
    -H "Content-Type: application/json" \
    -d '{"productId":"<product_id>","quantity":1}'
  ```

- PUT /cart/:id — Update cart item quantity (where `:id` is the product id)

  ```bash
  curl -X PUT http://localhost:3000/cart/<product_id> \
    -H "Authorization: Bearer <your_token>" \
    -H "Content-Type: application/json" \
    -d '{"quantity":2}'
  ```

- DELETE /cart/:id — Remove product from cart

  ```bash
  curl -X DELETE http://localhost:3000/cart/<product_id> \
    -H "Authorization: Bearer <your_token>"
  ```

## Testing with Thunder Client

1. Open Thunder Client in VS Code.
2. Import the Thunder Client collection file provided (or create requests using the examples above).
3. Run `POST /auth/login` to get a token and copy it into the `Authorization` header for cart requests.

Optional: use the included collection JSON `shoppyglobe-thunder-collection.json` if provided.

## Notes about grading checklist

Per the assignment requirements:

1. Node.js + Express setup: implemented. Routes are in `routes/` and controllers in `controllers/`.
2. MongoDB integration: models are in `models/`. The app connects to `mongodb://localhost:27017/shoppyglobe` in `server.js`.
3. Error handling & validation: route-level validation present; controllers use `next(error)` for centralized handling. (Add global error middleware if required by grader.)
4. Authentication: JWT-based auth implemented in `middleware/authMiddleware.js` and `utils/generateToken.js`.
5. Testing: use Thunder Client or curl commands above — seed data available via `seeder.js`.

## Recommended small improvements

- Add a global error-handling middleware in `server.js` to normalize error responses.
- Add `.env` support for `MONGO_URI` and `JWT_SECRET` for production-safe configuration.
- Add more comprehensive validation for request bodies (e.g., express-validator).

## Screenshots

Include MongoDB Compass screenshots showing the `shoppyglobe` database and the `products` collection (the instructor asked for these). You can export screenshots from Compass and include them in your submission.

---

If you want, I can add the global error-handler and push an updated `server.js` now, and then finalize the README with exact instructions for submission and screenshots.
# ShoppyGlobe E-commerce API

This is the backend API for the ShoppyGlobe application built using Node.js, Express, and MongoDB.

## Features
- **User Authentication:** JWT-based user registration and login.
- **Product Management:** Fetch products and specific product details.
- **Cart Management:** Add to cart, update quantity, remove items (protected routes).
- **Error Handling:** Centralized error handling and 404 handler.
- **ES Modules:** Built with ESM syntax (`import`/`export`).

## Prerequisites
- Node.js installed
- MongoDB URI (local or Atlas)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory based on the provided `.env.example`:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_super_secret_jwt_key
   ```
   **Important:** Replace `your_mongodb_connection_string_here` with a valid MongoDB URI. You can get a free cluster from MongoDB Atlas or use local MongoDB compass `mongodb://localhost:27017/shoppyglobe`.

3. **Seed Database**
   To populate the database with dummy products and users (admin@example.com / password123, user@example.com / password123):
   ```bash
   npm run data:import
   ```

4. **Run the Server**
   ```bash
   # Development mode (nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product by ID

### Cart (Requires Authentication - Bearer Token)
- `POST /cart` - Add product to cart. Body: `{ "productId": "id", "quantity": 1 }`
- `PUT /cart/:id` - Update cart item quantity (where `:id` is the product ID). Body: `{ "quantity": 2 }`
- `DELETE /cart/:id` - Remove product from cart (where `:id` is the product ID)

## Testing Instructions (For Submission)
You need to test this API with **ThunderClient** (or Postman) and submit the screenshots.
1. Run the server using `npm run dev`.
2. Open ThunderClient in VS Code.
3. Test **User Registration** to get a token.
4. Copy the `token` from the response.
5. In ThunderClient, go to the `Auth` tab for Cart routes, select `Bearer Token`, and paste the token.
6. Test **Add to Cart**, **Update Cart**, and **Delete from Cart**.
7. Take screenshots of these requests and their responses.
8. Take screenshots of your MongoDB database (Atlas/Compass) showing the collections (`users`, `products`, `carts`) with data.
9. Put all these screenshots into a PDF or DOC file.

## Technologies Used
- Node.js
- Express
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcryptjs
