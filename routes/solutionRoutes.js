const express = require('express');
const router = express.Router();
const {
  getAllSolutions,
  getSolution,
  filterSolutions,
  createSolution,
  updateSolution,
  deleteSolution,
  viewSolution,
  getSolutionsByTicketId,
  getSolutionByTicketIdAndConfigId,
  submitRating,
  getRatings
} = require('../controllers/solutionController');

// Route to get all solutions
router.get('/', getAllSolutions);

// Route to get a specific solution by its ID
router.get('/:id', getSolution);

// Route to get a specific solution based on form data
router.post('/filter', filterSolutions);

// Route to create a new solution
router.post('/', createSolution);

// Route to update an existing solution by its ID
router.put('/:id', updateSolution);

// add view to a solution
router.get('/:id/view', viewSolution);

// Route to delete a solution by its ID
router.delete('/:id', deleteSolution);

// Route to get solutions by ticket ID
router.get('/ticket/:ticketId', getSolutionsByTicketId);

// Route to get a solution by ticket ID and configuration ID
router.get('/ticket/:ticketId/config/:configId', getSolutionByTicketIdAndConfigId);

// Submit a rating for a solution
router.post('/:id/rate', submitRating);

// Get all ratings for a solution
router.get('/:id/ratings', getRatings);

module.exports = router;
