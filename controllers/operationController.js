const Operation = require("../models/Operation"); // Adjust the path as necessary

const operationController = {
  getAllOperations: async (req, res) => {
    try {
      const operations = await Operation.findAll();
      res.status(200).json(operations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createOperation: async (req, res) => {
    try {
      console.log("req.body:", req.body);
      const operation = await Operation.create(req.body);
      res.status(201).json(operation);
    } catch (error) {
      console.log("error.message:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  getOperationById: async (req, res) => {
    try {
      const operation = await Operation.findByPk(req.params.operationId);
      if (operation) {
        res.status(200).json(operation);
      } else {
        res.status(404).json({ error: "Operation not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateOperation: async (req, res) => {
    try {
      const operation = await Operation.findByPk(req.params.operationId);
      if (operation) {
        const updatedOperation = await operation.update(req.body);
        res.status(200).json(updatedOperation);
      } else {
        res.status(404).json({ error: "Operation not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteOperation: async (req, res) => {
    try {
      const operation = await Operation.findByPk(req.params.operationId);
      if (operation) {
        await operation.destroy();
        res.status(200).json({ message: "Operation deleted" });
      } else {
        res.status(404).json({ error: "Operation not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getOperationsByProcedureId: async (req, res) => {
    try {
      const operations = await Operation.findAll({
        where: { procedureId: req.params.procedureId },
      });
      res.status(200).json(operations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getOperationsByPhaseId: async (req, res) => {
    try {
      const operations = await Operation.findAll({
        where: { phase_id: req.params.phaseId },
      });
      res.status(200).json(operations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = operationController;
