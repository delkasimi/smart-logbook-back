const SolutionConfig = require('../models/SolutionConfig'); // Adjust the path as necessary

// Get all solution configs
const getAllConfigs = async (req, res) => {
    try {
        const configs = await SolutionConfig.findAll();
        res.json(configs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get a specific solution config
const getConfig = async (req, res) => {
    const { id } = req.params;
    try {
        const config = await SolutionConfig.findByPk(id);
        if (!config) {
            return res.status(404).send('Config not found');
        }
        res.json(config);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Create a new solution config
const createConfig = async (req, res) => {
    try {
        const newConfig = await SolutionConfig.create(req.body);
        res.json(newConfig);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Update a solution config
const updateConfig = async (req, res) => {
    const { id } = req.params;
    try {
        const config = await SolutionConfig.findByPk(id);
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

// Delete a solution config
const deleteConfig = async (req, res) => {
    const { id } = req.params;
    try {
        const config = await SolutionConfig.findByPk(id);
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
    getAllConfigs,
    getConfig,
    createConfig,
    updateConfig,
    deleteConfig
};
