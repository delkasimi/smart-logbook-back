const express = require('express');
const router = express.Router();
const phaseController = require('../controllers/phaseController'); // Adjust the path as necessary

// Route to get all phases
router.get('/', phaseController.getAllPhases);

// Route to create a new phase
router.post('/', phaseController.createPhase);

// Route to get a single phase by ID
router.get('/:phaseId', phaseController.getPhaseById);

// Route to update a phase by ID
router.put('/:phaseId', phaseController.updatePhase);

// Route to delete a phase by ID
router.delete('/:phaseId', phaseController.deletePhase);

// Route to get phases by Procedure ID
router.get('/procedure/:procedureId', phaseController.getPhasesByProcedureId);

module.exports = router;
