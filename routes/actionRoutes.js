const express = require("express");
const router = express.Router();
const ActionController = require("../controllers/actionController");

// Create a new action
router.post("/", ActionController.createAction);

// Get all actions
router.get("/", ActionController.getAllActions);

// Get action by ID
router.get("/:actionId", ActionController.getActionById);

// Get action by operation ID
router.get("/operation/:operationId", ActionController.getActionsByOperationId);

// Update an action by ID
router.put("/:actionId", ActionController.updateActionById);

// Delete an action by ID
router.delete("/:actionId", ActionController.deleteActionById);

// Get actions by object IDs
router.post("/actionsByObjectIds", ActionController.getActionsByObjectIds);

module.exports = router;
