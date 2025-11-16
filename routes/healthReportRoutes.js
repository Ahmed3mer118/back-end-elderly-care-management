const express = require('express');
const router = express.Router();
const healthReportController = require('../controllers/healthReportController');

router.get('/', healthReportController.getAllHealthReports);
router.get('/elderly/:elderlyId', healthReportController.getHealthReportsByElderlyId);
router.get('/:id', healthReportController.getHealthReportById);
router.post('/', healthReportController.createHealthReport);
router.put('/:id', healthReportController.updateHealthReport);
router.delete('/:id', healthReportController.deleteHealthReport);

module.exports = router;


