// Route imports
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Mount routes
app.use('/auth', authRoutes); // Alternatively, you can mount register/login on root or /users
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('ShoppyGlobe API is running...');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;
db.on("open", () => {
  console.log("Database connected");
});

db.on("error", (err) => {
  console.error("Database connection error:", err);
});