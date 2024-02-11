const OperationType = require('../models/OperationType'); // Adjust the path as necessary

const operationTypeController = {
  getAllOperationTypes: async (req, res) => {
    try {
      const operationTypes = await OperationType.findAll();
      res.status(200).json(operationTypes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createOperationType: async (req, res) => {
    try {
      const operationType = await OperationType.create(req.body);
      res.status(201).json(operationType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getOperationTypeById: async (req, res) => {
    try {
      const operationType = await OperationType.findByPk(req.params.operationTypeId);
      if (operationType) {
        res.status(200).json(operationType);
      } else {
        res.status(404).json({ error: 'Operation type not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateOperationType: async (req, res) => {
    try {
      const operationType = await OperationType.findByPk(req.params.operationTypeId);
      if (operationType) {
        const updatedOperationType = await operationType.update(req.body);
        res.status(200).json(updatedOperationType);
      } else {
        res.status(404).json({ error: 'Operation type not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteOperationType: async (req, res) => {
    try {
      const operationType = await OperationType.findByPk(req.params.operationTypeId);
      if (operationType) {
        await operationType.destroy();
        res.status(200).json({ message: 'Operation type deleted' });
      } else {
        res.status(404).json({ error: 'Operation type not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = operationTypeController;
