const express = require('express');
const router = express.Router();
const operationController = require('../controllers/operationController'); // Adjust the path as necessary

router.get('/', operationController.getAllOperations);
router.post('/', operationController.createOperation);
router.get('/:operationId', operationController.getOperationById);
router.put('/:operationId', operationController.updateOperation);
router.delete('/:operationId', operationController.deleteOperation);
// Route to get operations by Procedure ID
router.get('/procedure/:procedureId', operationController.getOperationsByProcedureId);

// Route to get operations by Phase ID
router.get('/phase/:phaseId', operationController.getOperationsByPhaseId);


module.exports = router;
