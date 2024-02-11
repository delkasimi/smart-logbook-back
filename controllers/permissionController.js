const Permission = require('../models/Permission');

// Create a new permission
exports.createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const permission = await Permission.create({ name });
    res.status(201).json(permission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Permission creation failed' });
  }
};

// Update a permission by ID
exports.updatePermissionById = async (req, res) => {
  try {
    const { permissionId } = req.params;
    const { name } = req.body;
    const permission = await Permission.findByPk(permissionId);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    permission.name = name;
    await permission.save();
    res.status(200).json(permission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Permission update failed' });
  }
};

// Delete a permission by ID
exports.deletePermissionById = async (req, res) => {
  try {
    const { permissionId } = req.params;
    const permission = await Permission.findByPk(permissionId);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    await permission.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Permission deletion failed' });
  }
};

// Get all permissions
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve permissions' });
  }
};