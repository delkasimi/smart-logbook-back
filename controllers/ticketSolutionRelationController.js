const TicketSolutionRelation = require('../models/TicketSolutionRelation');
const Ticket = require('../models/TicketData'); 
const Solution = require('../models/SolutionData'); 

// Create a new relation
const createRelation = async (req, res) => {
    try {
        const { ticket_id, solution_id } = req.body;
        const newRelation = await TicketSolutionRelation.create({
            ticket_id,
            solution_id
        });

        // Find the related solution
        const relatedSolution = await Solution.findByPk(solution_id);
        if (!relatedSolution) {
            return res.status(404).json({ error: 'Related solution not found' });
        }
        
        // Increment the usage field
        relatedSolution.usage = (relatedSolution.usage || 0) + 1;
        
        // Save the updated solution
        await relatedSolution.save();
        
        return res.status(201).json(newRelation);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Retrieve all relations
const getAllRelations = async (req, res) => {
    try {
        const relations = await TicketSolutionRelation.findAll();
        return res.status(200).json(relations);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get a single relation by ID
const getRelationById = async (req, res) => {
    try {
        const { id } = req.params;
        const relation = await TicketSolutionRelation.findByPk(id);
        if (!relation) {
            return res.status(404).json({ error: 'Relation not found' });
        }
        return res.status(200).json(relation);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update a relation
const updateRelation = async (req, res) => {
    try {
        const { id } = req.params;
        const { ticket_id, solution_id } = req.body;
        const relation = await TicketSolutionRelation.findByPk(id);
        if (!relation) {
            return res.status(404).json({ error: 'Relation not found' });
        }
        relation.ticket_id = ticket_id;
        relation.solution_id = solution_id;
        await relation.save();
        return res.status(200).json(relation);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete a relation
const deleteRelation = async (req, res) => {
    try {
        const { id } = req.params;
        const relation = await TicketSolutionRelation.findByPk(id);
        if (!relation) {
            return res.status(404).json({ error: 'Relation not found' });
        }
        await relation.destroy();
        return res.status(200).json({ message: 'Relation deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get relations by ticket_id
const getRelationsByTicketId = async (req, res) => {
    try {
        const { ticket_id } = req.params;
        const relations = await TicketSolutionRelation.findAll({
            where: { ticket_id },
            include: [{ model: Solution, as: 'Solution' }]
        });
        res.json(relations);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get relations by solution_id
const getRelationsBySolutionId = async (req, res) => {
    try {
        const { solution_id } = req.params;
        const relations = await TicketSolutionRelation.findAll({
            where: { solution_id },
            include: [{ model: Ticket, as: 'Ticket' }]
        });
        res.json(relations);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};



module.exports = {
    createRelation,
    getAllRelations,
    getRelationById,
    updateRelation,
    deleteRelation,
    getRelationsBySolutionId,
    getRelationsByTicketId
};
