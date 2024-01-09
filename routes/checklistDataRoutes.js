const express = require('express');
const router = express.Router();
const {
  getData,
  getDataById,
  createData,
  createBulkData,
  updateData,
  deleteData,
  getDataByConfig
} = require('../controllers/checklistDataController');

router.get('/', getData);
router.get('/:id', getDataById);
router.post('/', createData);
router.post('/bulk', createBulkData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);
router.get('/config/:conf_id', getDataByConfig);

module.exports = router;
