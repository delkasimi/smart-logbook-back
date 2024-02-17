const ActionReference = require("../models/ActionReference");
const Object = require("../models/Object");
const Act = require("../models/Act");
const ActionType = require("../models/ActionType");
const Media = require("../models/Media");
const Issue = require("../models/Issue");
const ActionReferenceIssues = require("../models/ActionReferenceIssues");
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
          {
            model: Issue,
            as: "Issues",
            through: {
              attributes: [],
            },
          },
        ],
      });

      // Use for...of loop to await asynchronous operations
      for (const actionReference of actionReferences) {
        // Extract issue IDs from the associated issues
        const issueIds = actionReference.Issues.map((issue) => issue.issue_id);
        actionReference.setDataValue("issue_ids", issueIds);

        const referenceObjectIds = actionReference.object_id;
        const relatedReferenceObjects = [];

        if (referenceObjectIds && referenceObjectIds.length > 0) {
          for (const referenceObjectId of referenceObjectIds) {
            const relatedReferenceObject = await Object.findByPk(
              referenceObjectId
            );
            relatedReferenceObjects.push(relatedReferenceObject);
          }
        }

        actionReference.setDataValue("Objects", relatedReferenceObjects);

        // Fetch media items for actions
        const actionMediaItems = await Media.findAll({
          where: {
            associated_id: actionReference.action_reference_id,
            associated_type: "action_reference",
          },
        });

        // Add media items to the action
        actionReference.setDataValue("Media", actionMediaItems);
      }

      // Since all async operations are awaited inside the loop, you can now directly return the modified actionReferences
      res.status(200).json(actionReferences);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createActionReference: async (req, res) => {
    const { issue_ids, ...actionReferenceData } = req.body;

    try {
      const actionReference = await ActionReference.create(actionReferenceData);

      if (issue_ids && issue_ids.length > 0) {
        const actionReferenceIssues = issue_ids.map((issueId) => ({
          action_reference_id: actionReference.action_reference_id, // Make sure the field name matches your model definition
          issue_id: issueId,
        }));
        await ActionReferenceIssues.bulkCreate(actionReferenceIssues);
      }
      const createdActionReference = await ActionReference.findByPk(
        actionReference.action_reference_id,
        {
          include: [
            {
              model: Act,
              as: "Act",
            },
            {
              model: ActionType,
              as: "ActionType",
            },
            {
              model: Issue,
              as: "Issues",
              through: {
                attributes: [],
              },
            },
          ],
        }
      );

      res.status(201).json(createdActionReference);
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
        // Fetch media items for actions
        const actionMediaItems = await Media.findAll({
          where: {
            associated_id: actionReference.action_reference_id,
            associated_type: "action_reference",
          },
        });

        // Add media items to the action
        actionReference.setDataValue("Media", actionMediaItems);

        res.status(200).json(actionReference);
      } else {
        res.status(404).json({ error: "Action reference not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateActionReference: async (req, res) => {
    const { issue_ids, ...actionReferenceData } = req.body;

    try {
      const actionReference = await ActionReference.findByPk(
        req.params.referenceId
      );
      if (!actionReference) {
        return res.status(404).json({ error: "Action reference not found" });
      }

      // Update the action reference with new data
      await actionReference.update(actionReferenceData);

      // Remove existing issue relations for this action reference
      await ActionReferenceIssues.destroy({
        where: { action_reference_id: req.params.referenceId },
      });

      // Create new issue relations if issue_ids are provided
      if (issue_ids && issue_ids.length > 0) {
        const actionReferenceIssues = issue_ids.map((issueId) => ({
          action_reference_id: actionReference.action_reference_id,
          issue_id: issueId,
        }));
        await ActionReferenceIssues.bulkCreate(actionReferenceIssues);
      }

      // Fetch the updated action reference with related issues
      const updatedActionReference = await ActionReference.findByPk(
        actionReference.action_reference_id,
        {
          include: [
            {
              model: Act,
              as: "Act",
            },
            {
              model: ActionType,
              as: "ActionType",
            },
            {
              model: Issue,
              as: "Issues",
              through: {
                attributes: [],
              },
            },
          ],
        }
      );

      res.status(200).json(updatedActionReference);
    } catch (error) {
      console.error("Error updating action reference:", error);
      res.status(400).json({ error: error.message });
    }
  },

  deleteActionReference: async (req, res) => {
    try {
      const actionReferenceId = req.params.referenceId;

      // First, check if the action reference exists
      const actionReference = await ActionReference.findByPk(actionReferenceId);
      if (!actionReference) {
        return res.status(404).json({ error: "Action reference not found" });
      }

      // Delete related ActionReferenceIssues
      await ActionReferenceIssues.destroy({
        where: { action_reference_id: actionReferenceId },
      });

      // Delete related Media items
      await Media.destroy({
        where: {
          associated_id: actionReferenceId,
          associated_type: "action_reference",
        },
      });

      // After deleting related records, delete the action reference itself
      await actionReference.destroy();

      res
        .status(200)
        .json({ message: "Action reference and related data deleted" });
    } catch (error) {
      console.error("Error deleting action reference and related data:", error);
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
