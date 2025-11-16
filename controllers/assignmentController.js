const Assignment = require('../models/Assignment');
const Elderly = require('../models/Elderly');

// Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      include: [{ model: Elderly, as: 'elderly' }],
      order: [['start_date', 'DESC']]
    });
    res.json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id, {
      include: [{ model: Elderly, as: 'elderly' }]
    });
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }
    res.json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get assignments by elderly ID
exports.getAssignmentsByElderlyId = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      where: { elderly_id: req.params.elderlyId },
      include: [{ model: Elderly, as: 'elderly' }],
      order: [['start_date', 'DESC']]
    });
    res.json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { elderly_id, nurse_id, start_date, end_date } = req.body;
    const assignment = await Assignment.create({
      elderly_id,
      nurse_id,
      start_date,
      end_date
    });
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }
    await assignment.update(req.body);
    res.json({ success: true, data: assignment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }
    await assignment.destroy();
    res.json({ success: true, message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


