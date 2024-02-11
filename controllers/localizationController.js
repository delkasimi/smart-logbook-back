const Localization = require('../models/Localization'); // Adjust the path as necessary

const localizationController = {
    getAllLocalizations: async (req, res) => {
        try {
            const localizations = await Localization.findAll();
            res.status(200).json(localizations);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    createLocalization: async (req, res) => {
        try {
            const localization = await Localization.create(req.body);
            res.status(201).json(localization);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getLocalizationById: async (req, res) => {
        try {
            const localization = await Localization.findByPk(req.params.localizationId);
            if (localization) {
                res.status(200).json(localization);
            } else {
                res.status(404).json({ error: 'Localization not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateLocalization: async (req, res) => {
        try {
            const localization = await Localization.findByPk(req.params.localizationId);
            if (localization) {
                const updatedLocalization = await localization.update(req.body);
                res.status(200).json(updatedLocalization);
            } else {
                res.status(404).json({ error: 'Localization not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteLocalization: async (req, res) => {
        try {
            const localization = await Localization.findByPk(req.params.localizationId);
            if (localization) {
                await localization.destroy();
                res.status(200).json({ message: 'Localization deleted' });
            } else {
                res.status(404).json({ error: 'Localization not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = localizationController;
