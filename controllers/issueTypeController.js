const IssueType = require("../models/IssueType");
const Issue = require("../models/Issue");

exports.getAllIssueTypes = async (req, res) => {
  try {
    const issueTypes = await IssueType.findAll({
      include: [
        {
          model: Issue,
          as: "issues",
          attributes: ["issue_id", "code", "label"],
        },
      ],
    });
    res.json(issueTypes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createIssueType = async (req, res) => {
  try {
    const issueType = await IssueType.create(req.body);
    res.status(201).json(issueType);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getIssueTypeById = async (req, res) => {
  try {
    const { issueTypeId } = req.params;
    const issueType = await IssueType.findByPk(issueTypeId);
    if (issueType) {
      res.json(issueType);
    } else {
      res.status(404).send("IssueType not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateIssueType = async (req, res) => {
  try {
    const { issueTypeId } = req.params;
    const [updated] = await IssueType.update(req.body, {
      where: { id: issueTypeId },
    });
    if (updated) {
      const updatedIssueType = await IssueType.findByPk(issueTypeId);
      res.status(200).json(updatedIssueType);
    } else {
      res.status(404).send("IssueType not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteIssueType = async (req, res) => {
  try {
    const { issueTypeId } = req.params;
    const deleted = await IssueType.destroy({
      where: { id: issueTypeId },
    });
    if (deleted) {
      res.status(204).send("IssueType deleted.");
    } else {
      res.status(404).send("IssueType not found.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
