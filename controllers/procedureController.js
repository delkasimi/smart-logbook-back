const {
  Procedure,
  AssetModel,
  AssetItem,
  Event,
  ProcedureType,
  Phase,
  Operation,
  Localization,
  ActionType,
  ActionReference,
  Action,
  OperationType,
  ResponseType,
  Object,
  Media,
  Act,
  Issue,
} = require("../models");

const procedureController = {
  getAllProcedures: async (req, res) => {
    try {
      const procedures = await Procedure.findAll();
      res.status(200).json(procedures);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createProcedure: async (req, res) => {
    try {
      const procedure = await Procedure.create(req.body);
      const phase = await Phase.create({
        procedure_id: procedure.procedure_id,
        phase_id: 9999,
        phase_name: "hidden",
        sequence: 1,
        status: "Active",
      });
      res.status(201).json(procedure);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getProcedureById: async (req, res) => {
    try {
      const procedure = await Procedure.findByPk(req.params.procedureId);
      if (procedure) {
        res.status(200).json(procedure);
      } else {
        res.status(404).json({ error: "Procedure not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateProcedure: async (req, res) => {
    try {
      const procedure = await Procedure.findByPk(req.params.procedureId);
      if (procedure) {
        const updatedProcedure = await procedure.update(req.body);
        res.status(200).json(updatedProcedure);
      } else {
        res.status(404).json({ error: "Procedure not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteProcedure: async (req, res) => {
    try {
      const procedure = await Procedure.findByPk(req.params.procedureId);
      if (procedure) {
        await procedure.destroy();
        res.status(200).json({ message: "Procedure deleted" });
      } else {
        res.status(404).json({ error: "Procedure not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Route to get procedures by procedure type ID
  getProceduresByType: async (req, res) => {
    try {
      const { proceduretypeid } = req.params;

      // Find all procedures that belong to the specified procedure type
      const procedures = await Procedure.findAll({
        where: {
          procedure_type_id: proceduretypeid,
        },
      });

      res.status(200).json(procedures);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getProceduresByAssetModelId: async (req, res) => {
    try {
      const assetModelId = req.params.assetModelId;

      const procedures = await Procedure.findAll({
        where: {
          asset_model_id: assetModelId,
        },
      });

      res.status(200).json(procedures);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // New method to get procedures by asset item id
  getProceduresByAssetItemId: async (req, res) => {
    try {
      const assetItemId = req.params.assetItemId;

      const procedures = await Procedure.findAll({
        where: {
          asset_item_id: assetItemId,
        },
      });

      res.status(200).json(procedures);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getProcedureDetailsById: async (req, res) => {
    try {
      const procedureId = req.params.procedureId;
      const procedure = await Procedure.findByPk(procedureId, {
        include: [
          { model: AssetModel, as: "AssetModel" },
          { model: AssetItem, as: "AssetItem" },
          { model: Event, as: "Event" },
          { model: ProcedureType, as: "ProcedureType" },
          {
            model: Phase,
            as: "Phases",
            include: [
              {
                model: Operation, // Include the Operation model
                as: "Operations", // Use the correct alias defined in your associations
                include: [
                  {
                    model: Action,
                    as: "Actions",
                    include: [
                      { model: Operation, as: "Operation" },
                      {
                        model: ActionReference,
                        as: "ActionReference",
                        include: [
                          { model: ActionType, as: "ActionType" },
                          { model: Act, as: "Act" },
                          { model: ResponseType, as: "ResponseType" },
                          {
                            model: Issue,
                            as: "Issues",
                            through: {
                              attributes: [],
                            },
                          },
                        ],
                      },
                      { model: ResponseType, as: "ResponseType" },
                      {
                        model: Localization,
                        as: "Localization",
                        include: [{ model: Media, as: "Media" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!procedure) {
        return res.status(404).json({ error: "Procedure not found" });
      }

      // Iterate through phases and operations to handle actions and related objects
      for (const phase of procedure.Phases) {
        for (const operation of phase.Operations) {
          for (const action of operation.Actions) {
            const objectIds = action.object_id;
            const relatedObjects = [];

            if (objectIds && objectIds.length > 0) {
              for (const objectId of objectIds) {
                const relatedObject = await Object.findByPk(objectId);
                if (relatedObject) {
                  const objectMediaItems = await Media.findAll({
                    where: {
                      associated_id: objectId,
                      associated_type: "object",
                    },
                  });
                  relatedObject.setDataValue("Media", objectMediaItems);
                  relatedObjects.push(relatedObject);
                }
              }
            }

            // Add related objects to the action
            action.setDataValue("Objects", relatedObjects);

            // Fetch media items for actions
            const actionMediaItems = await Media.findAll({
              where: {
                associated_id: action.action_id,
                associated_type: "action",
              },
            });

            // Add media items to the action
            action.setDataValue("Media", actionMediaItems);
          }
        }
      }

      res.status(200).json(procedure);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = procedureController;
