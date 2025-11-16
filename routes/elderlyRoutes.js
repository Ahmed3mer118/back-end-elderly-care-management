const express = require('express');
const router = express.Router();
const elderlyController = require('../controllers/elderlyController');

router.get('/', elderlyController.getAllElderly);
router.get('/:id', elderlyController.getElderlyById);
router.post('/', elderlyController.createElderly);
router.put('/:id', elderlyController.updateElderly);
router.delete('/:id', elderlyController.deleteElderly);

module.exports = router;


