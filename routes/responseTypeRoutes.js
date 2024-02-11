const express = require('express');
const router = express.Router();
const responseTypeController = require('../controllers/responseTypeController'); // Adjust the path as necessary

router.get('/', responseTypeController.getAllResponseTypes);
router.post('/', responseTypeController.createResponseType);
router.get('/:responseTypeId', responseTypeController.getResponseTypeById);
router.put('/:responseTypeId', responseTypeController.updateResponseType);
router.delete('/:responseTypeId', responseTypeController.deleteResponseType);

module.exports = router;
