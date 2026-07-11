import Product from './models/Product.js';

const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.create([
      {
        name: 'Sample Shirt',
        price: 25,
        description: 'A comfortable cotton shirt',
        stockQuantity: 10,
      },
      {
        name: 'Sample Shoes',
        price: 50,
        description: 'Lightweight running shoes',
        stockQuantity: 5,
      },
    ]);
    console.log('Products seeded');
  }
};

export default seedProducts;
