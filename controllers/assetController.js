const AssetModel = require('../models/AssetModel'); 
const AssetItem = require('../models/AssetItem'); 

const assetController = {
  getAllAssetModels: async (req, res) => {
    try {
      const models = await AssetModel.findAll();
      res.status(200).json(models);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createAssetModel: async (req, res) => {
    try {
      const model = await AssetModel.create(req.body);
      res.status(201).json(model);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAssetModelById: async (req, res) => {
    try {
      const model = await AssetModel.findByPk(req.params.modelId);
      if (model) {
        res.status(200).json(model);
      } else {
        res.status(404).json({ error: 'Asset Model not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateAssetModel: async (req, res) => {
    try {
      const model = await AssetModel.findByPk(req.params.modelId);
      if (model) {
        const updatedModel = await model.update(req.body);
        res.status(200).json(updatedModel);
      } else {
        res.status(404).json({ error: 'Asset Model not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteAssetModel: async (req, res) => {
    try {
      const model = await AssetModel.findByPk(req.params.modelId);
      if (model) {
        await model.destroy();
        res.status(200).json({ message: 'Asset Model deleted' });
      } else {
        res.status(404).json({ error: 'Asset Model not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllAssetItems: async (req, res) => {
    try {
      const items = await AssetItem.findAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createAssetItem: async (req, res) => {
    try {
      const item = await AssetItem.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAssetItemById: async (req, res) => {
    try {
      const item = await AssetItem.findByPk(req.params.itemId);
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ error: 'Asset Item not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateAssetItem: async (req, res) => {
    try {
      const item = await AssetItem.findByPk(req.params.itemId);
      if (item) {
        const updatedItem = await item.update(req.body);
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ error: 'Asset Item not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteAssetItem: async (req, res) => {
    try {
      const item = await AssetItem.findByPk(req.params.itemId);
      if (item) {
        await item.destroy();
        res.status(200).json({ message: 'Asset Item deleted' });
      } else {
        res.status(404).json({ error: 'Asset Item not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = assetController;
