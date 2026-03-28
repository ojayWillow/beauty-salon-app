const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ['skincare', 'haircare', 'makeup', 'nails', 'other'], default: 'other' },
  stock: { type: Number, default: 0 },
  image: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
