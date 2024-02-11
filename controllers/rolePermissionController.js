const RolePermission = require('../models/RolePermission');
const Permission = require('../models/Permission');

// Create a new role permission
exports.createRolePermission = async (req, res) => {
  try {
    const { role_id, permission_id } = req.body;

    // Create role permission
    const newRolePermission = await RolePermission.create({
      role_id,
      permission_id,
    });

    res.status(201).json({ message: 'Role permission created successfully', rolePermission: newRolePermission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Role permission creation failed' });
  }
};

exports.deleteRolePermissionByPermissionAndRole = async (req, res) => {
  try {
    const permissionId = req.params.permissionId;
    const roleId = req.params.roleId;

    // Delete role_permission entry by both permission_id and role_id
    const rowsDeleted = await RolePermission.destroy({
      where: { permission_id: permissionId, role_id: roleId }
    });

    if (rowsDeleted) {
      res.json({ message: 'Role permission pair deleted successfully' });
    } else {
      // No rows deleted means no matching pair was found
      res.status(404).json({ message: 'Role permission pair not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Role permission pair deletion failed' });
  }
};


// Get all role permissions
exports.getAllRolePermissions = async (req, res) => {
  try {
    // Implement role permission listing logic here
    const rolePermissions = await RolePermission.findAll();
    res.json(rolePermissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve role permissions' });
  }
};

// Get role permission by ID
exports.getRolePermissionById = async (req, res) => {
  try {
    const rolePermissionId = req.params.rolePermissionId;

    // Implement role permission retrieval by ID logic here
    const rolePermission = await RolePermission.findByPk(rolePermissionId);

    if (rolePermission) {
      res.json(rolePermission);
    } else {
      res.status(404).json({ message: 'Role permission not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve role permission' });
  }
};

// Get permissions by role ID
exports.getPermissionsByRoleId = async (req, res) => {
  try {
    const roleId = req.params.roleId;

    // Find all permission IDs associated with the given role ID from RolePermission
    const rolePermissionIds = await RolePermission.findAll({
      where: { role_id: roleId },
      attributes: ['permission_id'], // Select only permission_id field
    });

    if (rolePermissionIds.length === 0) {
      return res.status(404).json({ message: 'No permissions found for the given role ID' });
    }

    // Extract permission IDs from the result
    const permissionIds = rolePermissionIds.map((rolePermission) => rolePermission.permission_id);

    // Retrieve all permissions with the extracted permission IDs
    const permissions = await Permission.findAll({
      where: { id: permissionIds },
    });

    if (permissions) {
      res.json(permissions);
    } else {
      res.status(404).json({ message: 'No permissions found for the given role ID' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve permissions by role ID' });
  }
};

