import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Add product to cart
// @route   POST /cart
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Validate inputs
    if (!productId) {
      res.status(400);
      throw new Error('Please provide a product ID');
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const qty = Number(quantity) || 1;

    // Find user's cart
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Cart exists for user
      let itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity
        cart.items[itemIndex].quantity += qty;
      } else {
        // Product does not exist in cart, add new item
        cart.items.push({ product: productId, quantity: qty });
      }
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
      // No cart for user, create new cart
      const newCart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: qty }]
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /cart/:id
// @access  Private
export const updateCartItemQuantity = async (req, res, next) => {
  try {
    const productId = req.params.id; // product ID to update
    const { quantity } = req.body;
    const userId = req.user._id;

    if (quantity === undefined || quantity < 1) {
      res.status(400);
      throw new Error('Please provide a valid quantity');
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    let itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = Number(quantity);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      res.status(404);
      throw new Error('Product not found in cart');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Remove product from cart
// @route   DELETE /cart/:id
// @access  Private
export const removeFromCart = async (req, res, next) => {
  try {
    const productId = req.params.id; // product ID to remove
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    let itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      res.status(404);
      throw new Error('Product not found in cart');
    }
  } catch (error) {
    next(error);
  }
};
