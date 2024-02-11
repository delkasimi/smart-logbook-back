const express = require('express');
const router = express.Router();
const operationTypeController = require('../controllers/operationTypeController'); // Adjust the path as necessary

router.get('/', operationTypeController.getAllOperationTypes);
router.post('/', operationTypeController.createOperationType);
router.get('/:operationTypeId', operationTypeController.getOperationTypeById);
router.put('/:operationTypeId', operationTypeController.updateOperationType);
router.delete('/:operationTypeId', operationTypeController.deleteOperationType);

module.exports = router;
