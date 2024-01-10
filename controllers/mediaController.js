const Media = require('../models/Media'); // Adjust the path as necessary

// Get all media
const getAllMedia = async (req, res) => {
    try {
        const mediaItems = await Media.findAll();
        res.json(mediaItems);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get a specific media item
const getMedia = async (req, res) => {
    const { id } = req.params;
    try {
        const mediaItem = await Media.findByPk(id);
        if (!mediaItem) {
            return res.status(404).send('Media not found');
        }
        res.json(mediaItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Create a new media item
const createMedia = async (req, res) => {
    try {
        const newMedia = await Media.create(req.body);
        res.json(newMedia);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Update a media item
const updateMedia = async (req, res) => {
    const { id } = req.params;
    try {
        const mediaItem = await Media.findByPk(id);
        if (!mediaItem) {
            return res.status(404).send('Media not found');
        }
        const updatedMedia = await mediaItem.update(req.body);
        res.json(updatedMedia);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Delete a media item
const deleteMedia = async (req, res) => {
    const { id } = req.params;
    try {
        const mediaItem = await Media.findByPk(id);
        if (!mediaItem) {
            return res.status(404).send('Media not found');
        }
        await mediaItem.destroy();
        res.send('Media deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get media by solution ID
const getMediaBySolutionId = async (req, res) => {
    const { solutionId } = req.params;
    try {
        const mediaItems = await Media.findAll({ where: { associated_id: solutionId, associated_type: 'solution' } });
        res.json(mediaItems);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Get media by ticket ID
const getMediaByTicketId = async (req, res) => {
    const { ticketId } = req.params;
    try {
        const mediaItems = await Media.findAll({ where: { associated_id: ticketId, associated_type: 'ticket' } });
        res.json(mediaItems);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // When using multer-s3, the file location (URL) is provided in req.file.location
        const fileUrl = req.file.location;

        res.json({ message: 'File uploaded successfully', fileUrl });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllMedia,
    getMedia,
    createMedia,
    updateMedia,
    deleteMedia,
    getMediaBySolutionId,
    getMediaByTicketId,
    uploadMedia
};
