const express = require('express');
const router = express.Router();
const localizationController = require('../controllers/localizationController'); // Adjust the path as necessary

router.get('/', localizationController.getAllLocalizations);
router.post('/', localizationController.createLocalization);
router.get('/:localizationId', localizationController.getLocalizationById);
router.put('/:localizationId', localizationController.updateLocalization);
router.delete('/:localizationId', localizationController.deleteLocalization);

module.exports = router;
