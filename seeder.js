import mongoose from 'mongoose';
import User from './models/User.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';

const products = [
  {
    name: 'Wireless Headphones',
    price: 99,
    description: 'High-quality wireless headphones with noise cancellation.',
    stockQuantity: 25,
  },
  {
    name: 'Smart Watch',
    price: 149,
    description: 'Feature-rich smartwatch with fitness tracking.',
    stockQuantity: 15,
  },
  {
    name: 'Laptop Backpack',
    price: 59,
    description: 'Stylish and durable backpack for daily use.',
    stockQuantity: 40,
  },
];

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/shoppyglobe');
};

await connectDB();

const importData = async () => {
  try {
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      { email: 'admin@example.com', password: 'password123' },
      { email: 'user@example.com', password: 'password123' }
    ]);

    await Product.insertMany(products);

    console.log('Data Imported!');
    console.log('Created users:', createdUsers.length);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
