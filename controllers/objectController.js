const Object = require('../models/Object'); 

const objectController = {
  getAllObjects: async (req, res) => {
    try {
      const objects = await Object.findAll();
      res.status(200).json(objects);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createObject: async (req, res) => {
    try {
      const object = await Object.create(req.body);
      res.status(201).json(object);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getObjectById: async (req, res) => {
    try {
      const object = await Object.findByPk(req.params.objectId);
      if (object) {
        res.status(200).json(object);
      } else {
        res.status(404).json({ error: 'Object not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateObject: async (req, res) => {
    try {
      const object = await Object.findByPk(req.params.objectId);
      if (object) {
        const updatedObject = await object.update(req.body);
        res.status(200).json(updatedObject);
      } else {
        res.status(404).json({ error: 'Object not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteObject: async (req, res) => {
    try {
      const object = await Object.findByPk(req.params.objectId);
      if (object) {
        await object.destroy();
        res.status(200).json({ message: 'Object deleted' });
      } else {
        res.status(404).json({ error: 'Object not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = objectController;
