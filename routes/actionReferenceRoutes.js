const express = require('express');
const router = express.Router();
const actionReferenceController = require('../controllers/actionReferenceController'); // Adjust the path as necessary

// Route to get all action references
router.get('/', actionReferenceController.getAllActionReferences);

// Route to create a new action reference
router.post('/', actionReferenceController.createActionReference);

// Route to get an action reference by ID
router.get('/:referenceId', actionReferenceController.getActionReferenceById);

// Route to update an action reference by ID
router.put('/:referenceId', actionReferenceController.updateActionReference);

// Route to delete an action reference by ID
router.delete('/:referenceId', actionReferenceController.deleteActionReference);

// Route to get actions by object IDs
router.post('/actionsByObjectIds', actionReferenceController.getActionsByObjectIds);

module.exports = router;
