const Phase = require("../models/Phase");

const phaseController = {
  getAllPhases: async (req, res) => {
    try {
      const phases = await Phase.findAll();
      res.status(200).json(phases);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createPhase: async (req, res) => {
    try {
      const phase = await Phase.create(req.body);
      res.status(201).json(phase);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPhaseById: async (req, res) => {
    try {
      const phase = await Phase.findByPk(req.params.phaseId);
      if (phase) {
        res.status(200).json(phase);
      } else {
        res.status(404).json({ error: "Phase not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updatePhase: async (req, res) => {
    try {
      const phase = await Phase.findByPk(req.params.phaseId);
      if (phase) {
        const updatedPhase = await phase.update(req.body);
        res.status(200).json(updatedPhase);
      } else {
        res.status(404).json({ error: "Phase not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletePhase: async (req, res) => {
    try {
      const phase = await Phase.findByPk(req.params.phaseId);
      if (phase) {
        await phase.destroy();
        res.status(200).json({ message: "Phase deleted" });
      } else {
        res.status(404).json({ error: "Phase not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPhasesByProcedureId: async (req, res) => {
    try {
      const phases = await Phase.findAll({
        where: { procedure_id: req.params.procedureId },
      });
      res.status(200).json(phases);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = phaseController;
