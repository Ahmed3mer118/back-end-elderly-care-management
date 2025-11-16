const express = require('express');
const router = express.Router();
const relativeController = require('../controllers/relativeController');

router.get('/', relativeController.getAllRelatives);
router.get('/elderly/:elderlyId', relativeController.getRelativesByElderlyId);
router.get('/:id', relativeController.getRelativeById);
router.post('/', relativeController.createRelative);
router.put('/:id', relativeController.updateRelative);
router.delete('/:id', relativeController.deleteRelative);

module.exports = router;


