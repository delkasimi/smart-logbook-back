const ActionType = require('../models/ActionType'); // Adjust the path as necessary

const actionTypeController = {
    getAllActionTypes: async (req, res) => {
        try {
            const actionTypes = await ActionType.findAll();
            res.status(200).json(actionTypes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    createActionType: async (req, res) => {
        try {
            const actionType = await ActionType.create(req.body);
            res.status(201).json(actionType);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getActionTypeById: async (req, res) => {
        try {
            const actionType = await ActionType.findByPk(req.params.typeId);
            if (actionType) {
                res.status(200).json(actionType);
            } else {
                res.status(404).json({ error: 'Action type not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateActionType: async (req, res) => {
        try {
            const actionType = await ActionType.findByPk(req.params.typeId);
            if (actionType) {
                const updatedActionType = await actionType.update(req.body);
                res.status(200).json(updatedActionType);
            } else {
                res.status(404).json({ error: 'Action type not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteActionType: async (req, res) => {
        try {
            const actionType = await ActionType.findByPk(req.params.typeId);
            if (actionType) {
                await actionType.destroy();
                res.status(200).json({ message: 'Action type deleted' });
            } else {
                res.status(404).json({ error: 'Action type not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = actionTypeController;
