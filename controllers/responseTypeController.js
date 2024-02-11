const ResponseType = require('../models/ResponseType'); // Adjust the path as necessary

const responseTypeController = {
    getAllResponseTypes: async (req, res) => {
        try {
            const responseTypes = await ResponseType.findAll();
            res.status(200).json(responseTypes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    createResponseType: async (req, res) => {
        try {
            const responseType = await ResponseType.create(req.body);
            res.status(201).json(responseType);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getResponseTypeById: async (req, res) => {
        try {
            const responseType = await ResponseType.findByPk(req.params.responseTypeId);
            if (responseType) {
                res.status(200).json(responseType);
            } else {
                res.status(404).json({ error: 'Response type not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateResponseType: async (req, res) => {
        try {
            const responseType = await ResponseType.findByPk(req.params.responseTypeId);
            if (responseType) {
                const updatedResponseType = await responseType.update(req.body);
                res.status(200).json(updatedResponseType);
            } else {
                res.status(404).json({ error: 'Response type not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteResponseType: async (req, res) => {
        try {
            const responseType = await ResponseType.findByPk(req.params.responseTypeId);
            if (responseType) {
                await responseType.destroy();
                res.status(200).json({ message: 'Response type deleted' });
            } else {
                res.status(404).json({ error: 'Response type not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = responseTypeController;
