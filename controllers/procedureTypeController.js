const ProcedureType = require('../models/procedureType'); 

const procedureTypeController = {
  getAllProcedureTypes: async (req, res) => {
    try {
      const procedureTypes = await ProcedureType.findAll();
      res.status(200).json(procedureTypes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createProcedureType: async (req, res) => {
    try {
      const procedureType = await ProcedureType.create(req.body);
      res.status(201).json(procedureType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getProcedureTypeById: async (req, res) => {
    try {
      const procedureType = await ProcedureType.findByPk(req.params.procedureTypeId);
      if (procedureType) {
        res.status(200).json(procedureType);
      } else {
        res.status(404).json({ error: 'ProcedureType not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateProcedureType: async (req, res) => {
    try {
      const procedureType = await ProcedureType.findByPk(req.params.procedureTypeId);
      if (procedureType) {
        const updatedProcedureType = await procedureType.update(req.body);
        res.status(200).json(updatedProcedureType);
      } else {
        res.status(404).json({ error: 'ProcedureType not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteProcedureType: async (req, res) => {
    try {
      const procedureType = await ProcedureType.findByPk(req.params.procedureTypeId);
      if (procedureType) {
        await procedureType.destroy();
        res.status(200).json({ message: 'ProcedureType deleted' });
      } else {
        res.status(404).json({ error: 'ProcedureType not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = procedureTypeController;
