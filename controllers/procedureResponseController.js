const ProceduresResponse = require("../models/ProceduresResponse"); // Path to your model

class ProceduresResponseController {
  // Create a new response
  async create(req, res) {
    try {
      const { procedure_id, response } = req.body;
      const newResponse = await ProceduresResponse.create({
        procedure_id,
        response,
      });
      res.json(newResponse);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  // Get all responses
  async getAll(req, res) {
    try {
      const responses = await ProceduresResponse.findAll();
      res.json(responses);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  // Get responses by procedure ID
  async getByProcedureId(req, res) {
    try {
      const { procedure_id } = req.params;
      const responses = await ProceduresResponse.findAll({
        where: { procedure_id },
      });
      res.json(responses);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = new ProceduresResponseController();
