const Issue = require("../models/Issue");

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.findAll();
    res.json(issues);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createIssue = async (req, res) => {
  try {
    const issue = await Issue.create(req.body);
    res.status(201).json(issue);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getIssueById = async (req, res) => {
  try {
    const { issueId } = req.params;
    const issue = await Issue.findByPk(issueId);
    if (issue) {
      res.json(issue);
    } else {
      res.status(404).send("Issue not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    const [updated] = await Issue.update(req.body, {
      where: { issue_id: issueId },
    });
    if (updated) {
      const updatedIssue = await Issue.findByPk(issueId);
      res.status(200).json(updatedIssue);
    } else {
      res.status(404).send("Issue not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    const deleted = await Issue.destroy({
      where: { issue_id: issueId },
    });
    if (deleted) {
      res.status(204).send("Issue deleted.");
    } else {
      res.status(404).send("Issue not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
