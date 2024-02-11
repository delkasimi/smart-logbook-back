const ActionReference = require("../models/ActionReference");
const Object = require("../models/Object");
const Act = require("../models/Act");
const ActionType = require("../models/ActionType");
const sequelize = require("../sequelize");
const { Op } = require("sequelize");

const actionReferenceController = {
  getAllActionReferences: async (req, res) => {
    try {
      const actionReferences = await ActionReference.findAll({
        include: [
          {
            model: Act,
            as: "Act",
          },
          {
            model: ActionType,
            as: "ActionType",
          },
        ],
      });

      for (const actRef of actionReferences) {
        const referenceObjectIds = actRef.object_id;
        const relatedReferenceObjects = [];

        if (referenceObjectIds && referenceObjectIds.length > 0) {
          for (const referenceObjectId of referenceObjectIds) {
            const relatedReferenceObject = await Object.findByPk(
              referenceObjectId
            );
            relatedReferenceObjects.push(relatedReferenceObject);
          }
        }

        actRef.setDataValue("Objects", relatedReferenceObjects);
      }

      res.status(200).json(actionReferences);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createActionReference: async (req, res) => {
    try {
      const actionReference = await ActionReference.create(req.body);
      res.status(201).json(actionReference);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getActionReferenceById: async (req, res) => {
    try {
      const actionReference = await ActionReference.findByPk(
        req.params.referenceId
      );
      if (actionReference) {
        res.status(200).json(actionReference);
      } else {
        res.status(404).json({ error: "Action reference not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateActionReference: async (req, res) => {
    try {
      const actionReference = await ActionReference.findByPk(
        req.params.referenceId
      );
      if (actionReference) {
        const updatedActionReference = await actionReference.update(req.body);
        res.status(200).json(updatedActionReference);
      } else {
        res.status(404).json({ error: "Action reference not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteActionReference: async (req, res) => {
    try {
      const actionReference = await ActionReference.findByPk(
        req.params.referenceId
      );
      if (actionReference) {
        await actionReference.destroy();
        res.status(200).json({ message: "Action reference deleted" });
      } else {
        res.status(404).json({ error: "Action reference not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getActionsByObjectIds: async (req, res) => {
    try {
      const actions = await ActionReference.findAll({
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
};

module.exports = actionReferenceController;
