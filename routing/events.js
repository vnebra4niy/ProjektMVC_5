const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.get('/', eventsController.getHomeEvents);
router.get('/music', eventsController.getMusicEvents);
router.get('/standup', eventsController.getStandupEvents);
router.get('/event/:id', eventsController.getEventDetails);

module.exports = router;