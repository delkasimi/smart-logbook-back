const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController'); // Adjust the path as necessary

// Route to get all events
router.get('/', eventController.getAllEvents);

// Route to create a new event
router.post('/', eventController.createEvent);

// Route to get a single event by ID
router.get('/:eventId', eventController.getEventById);

// Route to update an event by ID
router.put('/:eventId', eventController.updateEvent);

// Route to delete an event by ID
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;
