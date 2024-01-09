const ChecklistData = require('../models/ChecklistData'); // Adjust the path as necessary
const ChecklistConfig = require('../models/ChecklistConfig'); // Adjust the path as necessary

const getData = async (req, res) => {
  try {
    const data = await ChecklistData.findAll({
      include: [{ model: ChecklistConfig, as: 'config' }]
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ChecklistData.findByPk(id, {
      include: [{ model: ChecklistConfig, as: 'config' }]
    });
    if (!data) {
      return res.status(404).send('Data not found');
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const createData = async (req, res) => {
  try {
    const newData = await ChecklistData.create(req.body);
    res.json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const createBulkData = async (req, res) => {
  try {
    // Wrap each entry in an object with an 'entry' key
    const bulkData = req.body.map(entry => ({
      entry: entry, // Assuming 'entry' is the expected field name in your database
      conf_id: 1 // Adding conf_id to each object
    }));
    
    const newBulkData = await ChecklistData.bulkCreate(bulkData);
    res.json(newBulkData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};



const updateData = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ChecklistData.findByPk(id);
    if (!data) {
      return res.status(404).send('Data not found');
    }
    const updatedData = await data.update(req.body);
    res.json(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ChecklistData.findByPk(id);
    if (!data) {
      return res.status(404).send('Data not found');
    }
    await data.destroy();
    res.send('Data deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getDataByConfig = async (req, res) => {
  const { conf_id } = req.params;
  try {
    const data = await ChecklistData.findAll({
      where: { conf_id },
      include: [{ model: ChecklistConfig, as: 'config' }]
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getData,
  getDataById,
  createData,
  createBulkData,
  updateData,
  deleteData,
  getDataByConfig
};
