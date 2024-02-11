// ActController.js
const Act = require("../models/Act");

exports.createAct = async (req, res) => {
  try {
    const act = await Act.create(req.body);
    return res.status(201).json(act);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getAllActs = async (req, res) => {
  try {
    const acts = await Act.findAll();
    return res.status(200).json(acts);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getActById = async (req, res) => {
  try {
    const act = await Act.findByPk(req.params.id);
    if (!act) {
      return res.status(404).json({ message: "Act not found" });
    }
    return res.status(200).json(act);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.updateAct = async (req, res) => {
  try {
    const act = await Act.findByPk(req.params.id);
    if (!act) {
      return res.status(404).json({ message: "Act not found" });
    }
    await act.update(req.body);
    return res.status(200).json(act);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deleteAct = async (req, res) => {
  try {
    const act = await Act.findByPk(req.params.id);
    if (!act) {
      return res.status(404).json({ message: "Act not found" });
    }
    await act.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
