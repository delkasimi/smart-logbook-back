const TicketConfig = require('../models/TicketConfig'); // Adjust the path as necessary
const Ticket = require('../models/TicketData'); // Adjust the path as necessary

// Get all ticket configs
const getConfigs = async (req, res) => {
  try {
    const configs = await TicketConfig.findAll();
    res.json(configs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get a specific ticket config
const getConfig = async (req, res) => {
    const { id } = req.params;
    try {
      const config = await TicketConfig.findByPk(id);
      if (!config) {
        return res.status(404).send('Config not found');
      }
      res.json(config);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };  

// Create a new ticket config
const createConfig = async (req, res) => {
  try {
    const newConfig = await TicketConfig.create(req.body);
    res.json(newConfig);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Update a ticket config
const updateConfig = async (req, res) => {
  const { id } = req.params;
  try {
    const config = await TicketConfig.findByPk(id);
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

// Delete a ticket config
const deleteConfig = async (req, res) => {
  const { id } = req.params;
  try {
    const config = await TicketConfig.findByPk(id);
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

// Get tickets by config
const getTicketsByConfig = async (req, res) => {
  const { confId } = req.params;
  try {
    const tickets = await Ticket.findAll({
      where: { confId: confId }
    });

    if (!tickets.length) {
      return res.status(404).send('No tickets found for this config');
    }

    res.json(tickets);
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
  deleteConfig,
  getTicketsByConfig
};
