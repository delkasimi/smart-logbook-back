//ticketRoutes.js
const express = require('express');
const router = express.Router();
const { getTickets, getTicketById, createTicket, createBulkData, updateTicket, deleteTicket } = require('../controllers/ticketDataController');

// Get all tickets
router.get('/', getTickets);

// Get a ticket by ID
router.get('/:id', getTicketById);

// Create a new ticket
router.post('/', createTicket);

router.post('/bulk', createBulkData);

// Update a ticket
router.put('/:id', updateTicket);

// Delete a ticket
router.delete('/:id', deleteTicket);

module.exports = router;
