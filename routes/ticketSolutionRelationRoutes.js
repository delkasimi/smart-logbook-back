const express = require('express');
const router = express.Router();
const relationController = require('../controllers/ticketSolutionRelationController'); // Update this path to where your controller is located

// POST - Create a new relation
router.post('/', relationController.createRelation);

// GET - Retrieve all relations
router.get('/', relationController.getAllRelations);

// GET - Get a single relation by ID
router.get('/:id', relationController.getRelationById);

// PUT - Update a relation
router.put('/:id', relationController.updateRelation);

// DELETE - Delete a relation
router.delete('/:id', relationController.deleteRelation);

// GET - Get relations by ticket_id
router.get('/ticket/:ticket_id', relationController.getRelationsByTicketId);

// GET - Get relations by solution_id
router.get('/solution/:solution_id', relationController.getRelationsBySolutionId);

module.exports = router;
