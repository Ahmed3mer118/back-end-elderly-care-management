const HealthReport = require('../models/HealthReport');
const Elderly = require('../models/Elderly');

// Get all health reports
exports.getAllHealthReports = async (req, res) => {
  try {
    const reports = await HealthReport.findAll({
      include: [{ model: Elderly, as: 'elderly' }],
      order: [['report_date', 'DESC']]
    });
    res.json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get health report by ID
exports.getHealthReportById = async (req, res) => {
  try {
    const report = await HealthReport.findByPk(req.params.id, {
      include: [{ model: Elderly, as: 'elderly' }]
    });
    if (!report) {
      return res.status(404).json({ success: false, message: 'Health report not found' });
    }
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get health reports by elderly ID
exports.getHealthReportsByElderlyId = async (req, res) => {
  try {
    const reports = await HealthReport.findAll({
      where: { elderly_id: req.params.elderlyId },
      include: [{ model: Elderly, as: 'elderly' }],
      order: [['report_date', 'DESC']]
    });
    res.json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new health report
exports.createHealthReport = async (req, res) => {
  try {
    const {
      elderly_id,
      report_date,
      blood_pressure,
      heart_rate,
      sugar_level,
      weight,
      notes
    } = req.body;
    
    const report = await HealthReport.create({
      elderly_id,
      report_date,
      blood_pressure,
      heart_rate,
      sugar_level,
      weight,
      notes
    });
    
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update health report
exports.updateHealthReport = async (req, res) => {
  try {
    const report = await HealthReport.findByPk(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Health report not found' });
    }
    await report.update(req.body);
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete health report
exports.deleteHealthReport = async (req, res) => {
  try {
    const report = await HealthReport.findByPk(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Health report not found' });
    }
    await report.destroy();
    res.json({ success: true, message: 'Health report deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


