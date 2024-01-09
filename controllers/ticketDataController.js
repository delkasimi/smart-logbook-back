//ticketController.js
const Ticket = require('../models/TicketData'); // Adjust the path as necessary
const TicketConfig = require('../models/TicketConfig'); // Make sure this path is correct

// Get all tickets
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [{ model: TicketConfig, as: 'config' }]
    });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get a ticket by ID
const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Create a new ticket
const createTicket = async (req, res) => {
  const { entry, confId } = req.body;
  try {
    // Check if the referenced config exists
    const config = await TicketConfig.findByPk(confId);
    if (!config) {
      return res.status(400).send('Invalid confId');
    }

    const newTicket = await Ticket.create({ entry, confId });
    res.json(newTicket);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const createBulkData = async (req, res) => {
  try {
    // Wrap each entry in an object with an 'entry' key
    const bulkData = req.body.map(entry => ({
      entry: entry, // Assuming 'entry' is the expected field name in your database
      conf_id: 1 // Adding conf_id to each object
    }));
    
    const newBulkData = await Ticket.bulkCreate(bulkData);
    res.json(newBulkData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Update a ticket
const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { entry, confId } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }

    // Check if the referenced config exists (if confId is being updated)
    if (confId) {
      const config = await TicketConfig.findByPk(confId);
      if (!config) {
        return res.status(400).send('Invalid confId');
      }
    }

    const updatedTicket = await ticket.update({ entry, confId });
    res.json(updatedTicket);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Delete a ticket
const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }

    await ticket.destroy();
    res.send('Ticket deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  createBulkData,
  updateTicket,
  deleteTicket
};
