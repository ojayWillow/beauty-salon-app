const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'No items in order.' });
    const order = await Order.create({ user: req.user.id, items, totalAmount, status: 'pending' });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product', 'name price').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) return res.status(400).json({ message: 'Invalid status.' });
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};
