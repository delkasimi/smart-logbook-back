const Role = require('../models/Role');
const RolePermission = require('../models/RolePermission');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Role creation failed' });
  }
};

// Update a role by ID
exports.updateRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name, description } = req.body;
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    if (name) {
      role.name = name;
    }
    if (description) {
      role.description = description;
    }
    await role.save();
    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Role update failed' });
  }
};

// Delete a role by ID along with its role/permission pairs
exports.deleteRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;

    // Find the role by ID
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Find and delete all role/permission pairs with matching role_id
    await RolePermission.destroy({
      where: { role_id: roleId }
    });

    // Delete the role
    await role.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Role deletion failed' });
  }
};


// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve roles' });
  }
};