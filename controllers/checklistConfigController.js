const ChecklistConfig = require('../models/ChecklistConfig'); // Adjust the path as necessary

const getConfigs = async (req, res) => {
  try {
    const configs = await ChecklistConfig.findAll();
    res.json(configs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getConfig = async (req, res) => {
  const { id } = req.params;
  try {
    const config = await ChecklistConfig.findByPk(id);
    if (!config) {
      return res.status(404).send('Config not found');
    }
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const createConfig = async (req, res) => {
  try {
    const newConfig = await ChecklistConfig.create(req.body);
    res.json(newConfig);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateConfig = async (req, res) => {
  const { id } = req.params;
  try {
    const config = await ChecklistConfig.findByPk(id);
    if (!config) {
      return res.status(404).send('Config not found');
    }
    const updatedConfig = await config.update(req.body);
    res.json(updatedConfig);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteConfig = async (req, res) => {
  const { id } = req.params;
  try {
    const config = await ChecklistConfig.findByPk(id);
    if (!config) {
      return res.status(404).send('Config not found');
    }
    await config.destroy();
    res.send('Config deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getConfigs,
  getConfig,
  createConfig,
  updateConfig,
  deleteConfig
};
