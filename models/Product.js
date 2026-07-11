import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a product price'],
    min: [0, 'Price must be greater than or equal to 0']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock quantity cannot be less than 0']
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
