const express = require("express");
const router = express.Router();
const procedureResponseController = require("../controllers/procedureResponseController");

router.post("/", procedureResponseController.create);
router.get("/", procedureResponseController.getAll);
router.get("/:procedure_id", procedureResponseController.getByProcedureId);

module.exports = router;
