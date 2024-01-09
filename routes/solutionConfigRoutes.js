const express = require('express');
const router = express.Router();
const {
  getAllConfigs,
  getConfig,
  createConfig,
  updateConfig,
  deleteConfig
} = require('../controllers/solutionConfigController');

// Route to get all solution configs
router.get('/', getAllConfigs);

// Route to get a specific solution config by its ID
router.get('/:id', getConfig);

// Route to create a new solution config
router.post('/', createConfig);

// Route to update an existing solution config by its ID
router.put('/:id', updateConfig);

// Route to delete a solution config by its ID
router.delete('/:id', deleteConfig);

module.exports = router;
