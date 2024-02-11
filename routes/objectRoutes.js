const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController'); // Adjust the path as necessary

// Route to get all objects
router.get('/', objectController.getAllObjects);

// Route to create a new object
router.post('/', objectController.createObject);

// Route to get a single object by ID
router.get('/:objectId', objectController.getObjectById);

// Route to update an object by ID
router.put('/:objectId', objectController.updateObject);

// Route to delete an object by ID
router.delete('/:objectId', objectController.deleteObject);

module.exports = router;
