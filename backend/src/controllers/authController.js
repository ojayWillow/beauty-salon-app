const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required.' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: generateToken(user._id), user: { _id: user._id, name: user.name, email: user.email, createdAt: user.createdAt } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid email or password.' });
    res.json({ token: generateToken(user._id), user: { _id: user._id, name: user.name, email: user.email, createdAt: user.createdAt } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
