import express from 'express';
import {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All cart routes are protected
router.use(protect);

router.route('/')
  .post(addToCart);

router.route('/:id')
  .put(updateCartItemQuantity)
  .delete(removeFromCart);

export default router;
