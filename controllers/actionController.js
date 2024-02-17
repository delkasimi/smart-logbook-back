const { Op } = require("sequelize");
const Action = require("../models/Action");
const ActionReference = require("../models/ActionReference");
const Media = require("../models/Media");
const sequelize = require("../sequelize");

module.exports = {
  // Create a new action
  createAction: async (req, res) => {
    console.log("req.body", req.body);
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const actionReference = await ActionReference.findByPk(
        req.body.action_reference_id,
        { transaction }
      );
      if (!actionReference) {
        await transaction.rollback();
        return res.status(404).json({ error: "ActionReference not found" });
      }
      console.log("actionReference", actionReference);

      const action = await Action.create(
        {
          ...req.body,
          description: actionReference.description,
          response_type_id: actionReference.response_type_id,
          object_id: actionReference.object_id,
          localization_id: actionReference.localization_id,
        },
        { transaction }
      );

      const actionMediaItems = await Media.findAll({
        where: {
          associated_id: actionReference.action_reference_id,
          associated_type: "action_reference",
        },
        transaction,
      });

      let newMediaPromises = [];

      if (actionMediaItems && actionMediaItems.length > 0) {
        newMediaPromises = actionMediaItems.map((mediaItem) => {
          return Media.create(
            {
              associated_id: action.action_id,
              associated_type: "action",
              media_url: mediaItem.media_url,
              media_type: mediaItem.media_type,
              comment: mediaItem.comment,
            },
            { transaction }
          );
        });
      }

      // Now, you only proceed with attempting to create new media items if actionMediaItems is not empty
      await Promise.all(newMediaPromises);

      await transaction.commit();

      return res.json(action);
    } catch (error) {
      console.log("error.message", error.message);
      if (transaction) await transaction.rollback();
      return res
        .status(500)
        .json({ error: "Error creating action", details: error.message });
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

  updateActionById: async (req, res) => {
    console.log("req.body", req.body);
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const action = await Action.findByPk(req.body.action_id, { transaction });
      if (!action) {
        await transaction.rollback();
        return res.status(404).json({ error: "Action not found" });
      }

      const actionReference = await ActionReference.findByPk(
        req.body.action_reference_id,
        { transaction }
      );
      if (!actionReference) {
        await transaction.rollback();
        return res.status(404).json({ error: "New ActionReference not found" });
      }

      await action.update(
        {
          ...req.body,
          description: actionReference.description,
          response_type_id: actionReference.response_type_id,
          object_id: actionReference.object_id,
          localization_id: actionReference.localization_id,
        },
        { transaction }
      );

      await Media.destroy({
        where: {
          associated_id: action.action_id,
          associated_type: "action",
        },
        transaction,
      });
      const actionMediaItems = await Media.findAll({
        where: {
          associated_id: actionReference.action_reference_id,
          associated_type: "action_reference",
        },
        transaction,
      });

      const newMediaPromises = actionMediaItems.map((mediaItem) =>
        Media.create(
          {
            associated_id: action.action_id,
            associated_type: "action",
            media_url: mediaItem.media_url,
            media_type: mediaItem.media_type,
            comment: mediaItem.comment,
          },
          { transaction }
        )
      );

      await Promise.all(newMediaPromises);

      await transaction.commit();

      return res.json(action);
    } catch (error) {
      console.log("error.message", error.message);
      if (transaction) await transaction.rollback();
      return res
        .status(500)
        .json({ error: "Error updating action", details: error.message });
    }
  },

  // Delete an action by ID
  deleteActionById: async (req, res) => {
    const { actionId } = req.params;
    try {
      const transaction = await sequelize.transaction();

      const action = await Action.findByPk(actionId, { transaction });
      if (!action) {
        await transaction.rollback();
        return res.status(404).json({ error: "Action not found" });
      }
      await Media.destroy({
        where: {
          associated_id: actionId,
          associated_type: "action",
        },
        transaction,
      });

      await action.destroy({ transaction });
      await transaction.commit();

      return res.json({
        message: "Action and related media deleted successfully",
      });
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res
        .status(500)
        .json({ error: "Error deleting action", details: error.message });
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
