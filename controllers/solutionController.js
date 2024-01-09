const Solution = require('../models/SolutionData'); 
const TicketData = require('../models/TicketData');

// Get all solutions
const getAllSolutions = async (req, res) => {
    try {
        const solutions = await Solution.findAll();
        res.json(solutions);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get a specific solution
const getSolution = async (req, res) => {
    const { id } = req.params;
    try {
        const solution = await Solution.findByPk(id);
        if (!solution) {
            return res.status(404).send('Solution not found');
        }
        res.json(solution);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

//get solutions based on a form data
async function filterSolutions(req, res) {
    try {
        const input = req.body;

        const solutions = await Solution.findAll({
            include: [{
                model: TicketData,
                where: {
                    // Assuming 'entry' is a JSONB column
                    'entry.fleet': input.fleet,
                    //'entry.mainAsset': input.mainAsset,
                    // Add more conditions based on input fields
                }
            }]
        });

        res.json(solutions);
    } catch (error) {
        console.error('Error in filterSolutions:', error);
        res.status(500).send('Server error');
    }
}

// Create a new solution
const createSolution = async (req, res) => {
    try {
        const newSolution = await Solution.create(req.body);
        res.json(newSolution);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Update a solution
const updateSolution = async (req, res) => {
    const { id } = req.params;
    try {
        const solution = await Solution.findByPk(id);
        if (!solution) {
            return res.status(404).send('Solution not found');
        }
        const updatedSolution = await solution.update(req.body);
        res.json(updatedSolution);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const viewSolution = async (req, res) => {
    const { id } = req.params;
    try {
        const solution = await Solution.findByPk(id);
        if (!solution) {
            return res.status(404).send('Solution not found');
        }

        // Increment the views count
        solution.views = (solution.views || 0) + 1;

        // Save the updated solution
        await solution.save();

        res.json(solution);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const submitRating = async (req, res) => {
    const { id } = req.params;
    const { newRating } = req.body;

    try {
        const solution = await Solution.findByPk(id);
        if (!solution) {
            return res.status(404).send('Solution not found');
        }

        // Increment the rating count
        const newRatingCount = (solution.rating || 0) + 1;

        // Recalculate the average rating
        const newAverageRating = ((solution.average_rating || 0) * (newRatingCount - 1) + newRating) / newRatingCount;

        // Update solution with new ratings
        solution.rating = newRatingCount;
        solution.average_rating = newAverageRating;

        await solution.save();

        res.status(200).json({ message: 'Rating updated successfully', solution });
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).send('Server error');
    }
};


const getRatings = async (req, res) => {
    const { id } = req.params; // Solution ID

    try {
        const solution = await Solution.findByPk(id, {
            attributes: ['rating', 'average_rating']
        });
        
        if (!solution) {
            return res.status(404).send('Solution not found');
        }

        res.status(200).json({ solution });
    } catch (error) {
        console.error('Error retrieving solution rating:', error);
        res.status(500).send('Server error');
    }
};




// Delete a solution
const deleteSolution = async (req, res) => {
    const { id } = req.params;
    try {
        const solution = await Solution.findByPk(id);
        if (!solution) {
            return res.status(404).send('Solution not found');
        }
        await solution.destroy();
        res.send('Solution deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get solutions by ticket ID
const getSolutionsByTicketId = async (req, res) => {
    const { ticketId } = req.params;
    try {
        const solutions = await Solution.findAll({ where: { ticket_id: ticketId } });
        res.json(solutions);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get a solution by ticket ID and configuration ID
const getSolutionByTicketIdAndConfigId = async (req, res) => {
    const { ticketId, configId } = req.params;
    try {
        const solution = await Solution.findOne({ where: { ticket_id: ticketId, config_id: configId } });
        if (!solution) {
            return res.status(404).send('Solution not found');
        }
        res.json(solution);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllSolutions,
    getSolution,
    filterSolutions,
    createSolution,
    updateSolution,
    deleteSolution,
    viewSolution,
    getSolutionsByTicketId,
    getSolutionByTicketIdAndConfigId,
    getRatings,
    submitRating
};
