const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

// Import models without invoking them as functions
const Procedure = require("./procedure");
const ProcedureType = require("./procedureType");
const Event = require("./Event");
const AssetModel = require("./AssetModel");
const AssetItem = require("./AssetItem");
const Phase = require("./Phase");

const ResponseType = require("./ResponseType");
const OperationType = require("./OperationType");
const Operation = require("./Operation");
const ActionType = require("./ActionType");
const ActionReference = require("./ActionReference");
const Action = require("./Action");
const Localization = require("./Localization");
const Media = require("./Media");
const Object = require("./Object");
const Act = require("./Act");

// Associations
Procedure.belongsTo(ProcedureType, { foreignKey: "procedure_type_id" });
Procedure.belongsTo(Event, { foreignKey: "event_id" });
Procedure.belongsTo(AssetModel, { foreignKey: "asset_model_id" });
Procedure.belongsTo(AssetItem, { foreignKey: "asset_item_id" });

Procedure.hasMany(Phase, { foreignKey: "procedure_id", as: "Phases" });
Phase.belongsTo(Procedure, {
  foreignKey: "procedure_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Operation.belongsTo(Phase, { foreignKey: "phase_id" });
Phase.hasMany(Operation, { foreignKey: "phase_id", as: "Operations" });

Procedure.hasMany(Operation, { foreignKey: "procedure_id", as: "Operations" });
Operation.belongsTo(Procedure, { foreignKey: "procedure_id" });

OperationType.hasMany(Operation, {
  foreignKey: "operation_type_id",
  as: "Operations",
});
Operation.belongsTo(OperationType, { foreignKey: "operation_type_id" });

ResponseType.hasMany(Operation, {
  foreignKey: "response_type_id",
  as: "Operations",
});
Operation.belongsTo(ResponseType, { foreignKey: "response_type_id" });

Localization.hasMany(Operation, {
  foreignKey: "localization_id",
  as: "Operations",
});
Operation.belongsTo(Localization, { foreignKey: "localization_id" });

Media.hasMany(Localization, {
  foreignKey: "media_id",
  as: "Localizations",
});
Localization.belongsTo(Media, { foreignKey: "media_id", as: "Media" });

Operation.hasMany(Action, { foreignKey: "operation_id", as: "Actions" });
Action.belongsTo(Operation, { foreignKey: "operation_id" });

ActionReference.hasMany(Action, {
  foreignKey: "action_reference_id",
  as: "Actions",
});
Action.belongsTo(ActionReference, {
  foreignKey: "action_reference_id",
  as: "ActionReference",
});

ActionReference.belongsTo(Act, { foreignKey: "act_id" });
Act.hasMany(ActionReference, { foreignKey: "act_id", as: "ActionReferences" });

ActionType.hasMany(ActionReference, { foreignKey: "type_id", as: "Actions" });
ActionReference.belongsTo(ActionType, {
  foreignKey: "type_id",
  as: "ActionType",
});

Object.hasMany(Action, { foreignKey: "object_id", as: "Actions" });
Action.belongsTo(Object, { foreignKey: "object_id", as: "Object" });

ResponseType.hasMany(Action, { foreignKey: "response_type_id", as: "Actions" });
Action.belongsTo(ResponseType, {
  foreignKey: "response_type_id",
  as: "ResponseType",
});

ResponseType.hasMany(ActionReference, {
  foreignKey: "response_type_id",
  as: "ActionReference",
});
ActionReference.belongsTo(ResponseType, {
  foreignKey: "response_type_id",
  as: "ResponseType",
});

module.exports = {
  sequelize,
  Sequelize,
  Procedure,
  ProcedureType,
  Event,
  AssetModel,
  AssetItem,
  Phase,
  Operation,
  OperationType,
  ResponseType,
  Localization,
  ActionType,
  ActionReference,
  Action,
  Object,
  Media,
  // Add other models as needed
};
