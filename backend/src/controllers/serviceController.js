const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { available: true };
    if (category) query.category = category;
    const services = await Service.find(query);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
