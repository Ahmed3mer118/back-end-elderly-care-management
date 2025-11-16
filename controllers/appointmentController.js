const Appointment = require('../models/Appointment');
const Elderly = require('../models/Elderly');

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [{ model: Elderly, as: 'elderly' }],
      order: [['appointment_date', 'DESC']]
    });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [{ model: Elderly, as: 'elderly' }]
    });
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get appointments by elderly ID
exports.getAppointmentsByElderlyId = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { elderly_id: req.params.elderlyId },
      include: [{ model: Elderly, as: 'elderly' }],
      order: [['appointment_date', 'DESC']]
    });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { elderly_id, doctor_id, appointment_date, purpose, notes } = req.body;
    const appointment = await Appointment.create({
      elderly_id,
      doctor_id,
      appointment_date,
      purpose,
      notes
    });
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    await appointment.update(req.body);
    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    await appointment.destroy();
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


