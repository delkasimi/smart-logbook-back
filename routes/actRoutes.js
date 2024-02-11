const express = require("express");
const router = express.Router();
const actController = require("../controllers/ActController");

router.post("/", actController.createAct);
router.get("/", actController.getAllActs);
router.get("/:id", actController.getActById);
router.put("/:id", actController.updateAct);
router.delete("/:id", actController.deleteAct);

module.exports = router;
