// routes/procedureTypeRoutes.js
const express = require('express');
const router = express.Router();
const procedureTypeController = require('../controllers/procedureTypeController'); // Adjust the path as necessary

router.get('/', procedureTypeController.getAllProcedureTypes);
router.post('/', procedureTypeController.createProcedureType);
router.get('/:procedureTypeId', procedureTypeController.getProcedureTypeById);
router.put('/:procedureTypeId', procedureTypeController.updateProcedureType);
router.delete('/:procedureTypeId', procedureTypeController.deleteProcedureType);

module.exports = router;
