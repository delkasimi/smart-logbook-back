const express = require('express');
const router = express.Router();
const {
  getConfigs, 
  getConfig, 
  createConfig, 
  updateConfig, 
  deleteConfig, 
  getTicketsByConfig
} = require('../controllers/ticketConfigController');

// Get all configs
router.get('/', getConfigs);

// Get a specific config
router.get('/:id', getConfig); // Make sure this function is defined in your controller

// Create a new config
router.post('/', createConfig);

// Update a config
router.put('/:id', updateConfig);

// Delete a config
router.delete('/:id', deleteConfig);

// Get tickets by a specific config
router.get('/:id/tickets', getTicketsByConfig);

module.exports = router;
