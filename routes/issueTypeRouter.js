const express = require("express");
const router = express.Router();
const issueTypeController = require("../controllers/issueTypeController");

// IssueType Routes
router.get("/", issueTypeController.getAllIssueTypes);
router.post("/", issueTypeController.createIssueType);
router.get("/:issueTypeId", issueTypeController.getIssueTypeById);
router.put("/:issueTypeId", issueTypeController.updateIssueType);
router.delete("/:issueTypeId", issueTypeController.deleteIssueType);

module.exports = router;
