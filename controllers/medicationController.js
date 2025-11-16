const Medication = require('../models/Medication');
const Elderly = require('../models/Elderly');

// Get all medications
exports.getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.findAll({
      include: [{ model: Elderly, as: 'elderly' }]
    });
    res.json({ success: true, data: medications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get medication by ID
exports.getMedicationById = async (req, res) => {
  try {
    const medication = await Medication.findByPk(req.params.id, {
      include: [{ model: Elderly, as: 'elderly' }]
    });
    if (!medication) {
      return res.status(404).json({ success: false, message: 'Medication not found' });
    }
    res.json({ success: true, data: medication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get medications by elderly ID
exports.getMedicationsByElderlyId = async (req, res) => {
  try {
    const medications = await Medication.findAll({
      where: { elderly_id: req.params.elderlyId },
      include: [{ model: Elderly, as: 'elderly' }]
    });
    res.json({ success: true, data: medications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new medication
exports.createMedication = async (req, res) => {
  try {
    const { elderly_id, medicine_name, dosage, frequency, start_date, end_date } = req.body;
    const medication = await Medication.create({
      elderly_id,
      medicine_name,
      dosage,
      frequency,
      start_date,
      end_date
    });
    res.status(201).json({ success: true, data: medication });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update medication
exports.updateMedication = async (req, res) => {
  try {
    const medication = await Medication.findByPk(req.params.id);
    if (!medication) {
      return res.status(404).json({ success: false, message: 'Medication not found' });
    }
    await medication.update(req.body);
    res.json({ success: true, data: medication });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete medication
exports.deleteMedication = async (req, res) => {
  try {
    const medication = await Medication.findByPk(req.params.id);
    if (!medication) {
      return res.status(404).json({ success: false, message: 'Medication not found' });
    }
    await medication.destroy();
    res.json({ success: true, message: 'Medication deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


