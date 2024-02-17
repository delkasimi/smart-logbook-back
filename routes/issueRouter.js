const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issueController"); // Adjust the path as necessary

router.get("/", issueController.getAllIssues);
router.post("/", issueController.createIssue);
router.get("/:issueId", issueController.getIssueById);
router.put("/:issueId", issueController.updateIssue);
router.delete("/:issueId", issueController.deleteIssue);

module.exports = router;
