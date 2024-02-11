const { Op } = require("sequelize");
const Action = require("../models/Action");

module.exports = {
  // Create a new action
  createAction: async (req, res) => {
    try {
      const action = await Action.create(req.body);
      return res.json(action);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error creating action", details: error });
    }
  },

  // Get all actions
  getAllActions: async (req, res) => {
    try {
      const actions = await Action.findAll();
      return res.json(actions);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error getting actions", details: error });
    }
  },

  // Get action by ID
  getActionById: async (req, res) => {
    const { actionId } = req.params;
    try {
      const action = await Action.findByPk(actionId);
      if (!action) {
        return res.status(404).json({ error: "Action not found" });
      }
      return res.json(action);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error getting action", details: error });
    }
  },

  // Update an action by ID
  updateActionById: async (req, res) => {
    const { actionId } = req.params;
    try {
      const action = await Action.findByPk(actionId);
      if (!action) {
        return res.status(404).json({ error: "Action not found" });
      }
      await action.update(req.body);
      return res.json(action);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error updating action", details: error });
    }
  },

  // Delete an action by ID
  deleteActionById: async (req, res) => {
    const { actionId } = req.params;
    try {
      const action = await Action.findByPk(actionId);
      if (!action) {
        return res.status(404).json({ error: "Action not found" });
      }
      await action.destroy();
      return res.json({ message: "Action deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error deleting action", details: error });
    }
  },

  getActionsByObjectIds: async (req, res) => {
    try {
      const actions = await Action.findAll({
        where: {
          object_id: {
            [Op.contains]: req.body, // Assuming req.body is an array like [1, 2, 3]
          },
        },
      });
      res.json(actions); // Send response back to client
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred"); // Send error response
    }
  },

  getActionsByOperationId: async (req, res) => {
    try {
      const actions = await Action.findAll({
        where: { operation_id: req.params.operationId },
      });
      res.json(actions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
