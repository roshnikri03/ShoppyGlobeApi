import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product by ID
// @route   GET /products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    // Check if it's a valid ObjectId
    if (error.kind === 'ObjectId') {
      res.status(404);
      return next(new Error('Product not found'));
    }
    next(error);
  }
};
