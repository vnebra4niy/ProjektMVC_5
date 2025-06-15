const express = require('express');
const router = express.Router();
const reserveController = require('../controllers/reserveController');
const cancelController = require('../controllers/cancelController');

router.post('/reserve', reserveController.reserveSeats);
router.post('/cancel-all', cancelController.cancelAllSeats);

module.exports = router;
