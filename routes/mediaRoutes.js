const express = require("express");
const router = express.Router();
const upload = require("../multerConfig");
const mediaController = require("../controllers/mediaController");

const {
  getAllMedia,
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  getMediaBySolutionId,
  getMediaByTicketId,
  getMediaById,
} = require("../controllers/mediaController");

// Route to get all media
router.get("/", getAllMedia);

// Route to get a specific media item by its ID
router.get("/:id", getMedia);

// Route to create a new media item
router.post("/", createMedia);

// Route to update an existing media item by its ID
router.put("/:id", updateMedia);

// Route to delete a media item by its ID
router.delete("/:id", deleteMedia);

// Route to get media by solution ID
router.get("/solution/:solutionId", getMediaBySolutionId);

// Route to get media by ticket ID
router.get("/ticket/:ticketId", getMediaByTicketId);

// Route to get media by ticket ID
router.get("/:type/:ticketId", getMediaById);

router.post("/upload", upload.single("file"), mediaController.uploadMedia);

module.exports = router;
