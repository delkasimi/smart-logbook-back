const express = require('express');
const router = express.Router();
const actionTypeController = require('../controllers/actionTypeController'); // Adjust the path as necessary

// Route to get all action types
router.get('/', actionTypeController.getAllActionTypes);

// Route to create a new action type
router.post('/', actionTypeController.createActionType);

// Route to get an action type by ID
router.get('/:typeId', actionTypeController.getActionTypeById);

// Route to update an action type by ID
router.put('/:typeId', actionTypeController.updateActionType);

// Route to delete an action type by ID
router.delete('/:typeId', actionTypeController.deleteActionType);

module.exports = router;
