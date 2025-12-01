const Relative = require('../models/Relative');
const Elderly = require('../models/Elderly');

// Get all relatives
exports.getAllRelatives = async (req, res) => {
  try {
    const relatives = await Relative.findAll({
      include: [{ model: Elderly, as: 'elderly' }]
    });
    res.json({ success: true, data: relatives });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get relative by ID
exports.getRelativeById = async (req, res) => {
  try {
    const relative = await Relative.findByPk(req.params.id, {
      include: [{ model: Elderly, as: 'elderly' }]
    });
    if (!relative) {
      return res.status(404).json({ success: false, message: 'Relative not found' });
    }
    res.json({ success: true, data: relative });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get relatives by elderly ID
exports.getRelativesByElderlyId = async (req, res) => {
  try {
    const relatives = await Relative.findAll({
      where: { elderly_id: req.params.elderlyId },
      include: [{ model: Elderly, as: 'elderly' }]
    });
    res.json({ success: true, data: relatives });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new relative
exports.createRelative = async (req, res) => {
  try {
    const { elderly_id, full_name, relation, phone, email } = req.body;
    const relative = await Relative.create({
      elderly_id,
      full_name,
      relation,
      phone,
      email
    });
    res.status(201).json({ success: true, data: relative });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update relative
exports.updateRelative = async (req, res) => {
  try {
    const relative = await Relative.findByPk(req.params.id);
    if (!relative) {
      return res.status(404).json({ success: false, message: 'Relative not found' });
    }
    await relative.update(req.body);
    res.json({ success: true, data: relative });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete relative
exports.deleteRelative = async (req, res) => {
  try {
    const relative = await Relative.findByPk(req.params.id);
    if (!relative) {
      return res.status(404).json({ success: false, message: 'Relative not found' });
    }
    await relative.destroy();
    res.json({ success: true, message: 'Relative deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



