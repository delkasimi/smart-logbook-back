const express = require("express");
const router = express.Router();
const procedureController = require("../controllers/procedureController");

// Route to get all procedures
router.get("/", procedureController.getAllProcedures);

// Route to create a new procedure
router.post("/", procedureController.createProcedure);

// Route to get a single procedure by ID
router.get("/:procedureId", procedureController.getProcedureById);

// Route to update a procedure by ID
router.put("/:procedureId", procedureController.updateProcedure);

// Route to update a procedure by ID
router.get(
  "/details/:procedureId",
  procedureController.getProcedureDetailsById
);

// Route to delete a procedure by ID
router.delete("/:procedureId", procedureController.deleteProcedure);

// Route to get procedures by procedure type ID
router.get("/type/:proceduretypeid", procedureController.getProceduresByType);

// Route to get procedures by asset model id
router.get(
  "/model/:assetModelId",
  procedureController.getProceduresByAssetModelId
);

// Route to get procedures by asset item id
router.get(
  "/item/:assetItemId",
  procedureController.getProceduresByAssetItemId
);

module.exports = router;
