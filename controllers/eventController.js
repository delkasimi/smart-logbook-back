const Event = require('../models/Event');

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.status(200).json(events);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createEvent: async (req, res) => {
    try {
      const event = await Event.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.eventId);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.eventId);
      if (event) {
        const updatedEvent = await event.update(req.body);
        res.status(200).json(updatedEvent);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findByPk(req.params.eventId);
      if (event) {
        await event.destroy();
        res.status(200).json({ message: 'Event deleted' });
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = eventController;
