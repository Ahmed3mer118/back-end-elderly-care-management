const Elderly = require('../models/Elderly');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Medication = require('../models/Medication');
const HealthReport = require('../models/HealthReport');
const Relative = require('../models/Relative');
const Assignment = require('../models/Assignment');
const Notification = require('../models/Notification');

// Get all elderly
exports.getAllElderly = async (req, res) => {
  try {
    const elderly = await Elderly.findAll({
      include: [
        { model: User, as: 'user', attributes: ['username', 'email', 'role'] },
        { model: Appointment, as: 'appointments' },
        { model: Medication, as: 'medications' },
        { model: HealthReport, as: 'healthReports' },
        { model: Relative, as: 'relatives' },
        { model: Assignment, as: 'assignments' },
        { model: Notification, as: 'notifications' }
      ]
    });
    res.json({ success: true, data: elderly });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get elderly by ID
exports.getElderlyById = async (req, res) => {
  try {
    const elderly = await Elderly.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['username', 'email', 'role'] },
        { model: Appointment, as: 'appointments' },
        { model: Medication, as: 'medications' },
        { model: HealthReport, as: 'healthReports' },
        { model: Relative, as: 'relatives' },
        { model: Assignment, as: 'assignments' },
        { model: Notification, as: 'notifications' }
      ]
    });
    if (!elderly) {
      return res.status(404).json({ success: false, message: 'Elderly not found' });
    }
    res.json({ success: true, data: elderly });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new elderly
exports.createElderly = async (req, res) => {
  try {
    const {
      full_name,
      birth_date,
      gender,
      health_condition,
      blood_type,
      address,
      emergency_contact,
      users_user_id
    } = req.body;
    
    const elderly = await Elderly.create({
      full_name,
      birth_date,
      gender,
      health_condition,
      blood_type,
      address,
      emergency_contact,
      users_user_id
    });
    
    res.status(201).json({ success: true, data: elderly });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update elderly
exports.updateElderly = async (req, res) => {
  try {
    const elderly = await Elderly.findByPk(req.params.id);
    if (!elderly) {
      return res.status(404).json({ success: false, message: 'Elderly not found' });
    }
    
    await elderly.update(req.body);
    res.json({ success: true, data: elderly });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete elderly
exports.deleteElderly = async (req, res) => {
  try {
    const elderly = await Elderly.findByPk(req.params.id);
    if (!elderly) {
      return res.status(404).json({ success: false, message: 'Elderly not found' });
    }
    await elderly.destroy();
    res.json({ success: true, message: 'Elderly deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


