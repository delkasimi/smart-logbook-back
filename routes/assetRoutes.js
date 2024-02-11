const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController'); // Adjust the path as necessary

// Route to get all asset models
router.get('/models', assetController.getAllAssetModels);

// Route to create a new asset model
router.post('/models', assetController.createAssetModel);

// Route to get a single asset model by ID
router.get('/models/:modelId', assetController.getAssetModelById);

// Route to update an asset model by ID
router.put('/models/:modelId', assetController.updateAssetModel);

// Route to delete an asset model by ID
router.delete('/models/:modelId', assetController.deleteAssetModel);

// Route to get all asset items
router.get('/items', assetController.getAllAssetItems);

// Route to create a new asset item
router.post('/items', assetController.createAssetItem);

// Route to get a single asset item by ID
router.get('/items/:itemId', assetController.getAssetItemById);

// Route to update an asset item by ID
router.put('/items/:itemId', assetController.updateAssetItem);

// Route to delete an asset item by ID
router.delete('/items/:itemId', assetController.deleteAssetItem);

module.exports = router;
