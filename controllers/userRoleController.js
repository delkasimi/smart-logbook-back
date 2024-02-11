const UserRole = require('../models/UserRole');
const User = require('../models/User');
const Role = require('../models/Role');

// Create a new user role
exports.createUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    // Implement user role creation logic here
    const newUserRole = await UserRole.create({
      user_id,
      role_id,
    });

    res.status(201).json({ message: 'User role created successfully', userRole: newUserRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User role creation failed' });
  }
};

// Delete a user role by ID
exports.deleteUserRoleById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const roleId = req.params.roleId;

    // Implement user role deletion logic here
    const deletedUserRole = await UserRole.destroy({
      where: { user_id: userId,role_id: roleId },
    });

    if (deletedUserRole === 1) {
      res.json({ message: 'User role deleted successfully' });
    } else {
      res.status(404).json({ message: 'User role not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User role deletion failed' });
  }
};

// Get all user roles
exports.getAllUserRoles = async (req, res) => {
  try {
    // Implement user role listing logic here
    const userRoles = await UserRole.findAll();
    res.json(userRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve user roles' });
  }
};

// Get user role by ID
exports.getUserRoleById = async (req, res) => {
  try {
    const userRoleId = req.params.userRoleId;

    // Implement user role retrieval by ID logic here
    const userRole = await UserRole.findByPk(userRoleId);

    if (userRole) {
      res.json(userRole);
    } else {
      res.status(404).json({ message: 'User role not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve user role' });
  }
};
  
  // Get users by role ID
exports.getUsersByRoleId = async (req, res) => {
    try {
      const roleId = req.params.roleId;
  
      // Find all user IDs associated with the given role ID from UserRole
      const userRoleIds = await UserRole.findAll({
        where: { role_id: roleId },
        attributes: ['user_id'], // Select only user_id field
      });
  
      if (userRoleIds.length === 0) {
        return res.status(404).json({ message: 'No users found for the given role ID' });
      }
  
      // Extract user IDs from the result
      const userIds = userRoleIds.map((userRole) => userRole.user_id);
  
      // Retrieve all users with the extracted user IDs
      const users = await User.findAll({
        where: { id: userIds },
        attributes: { exclude: ['password_hash'] },
      });
  
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({ message: 'No users found for the given role ID' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve users by role ID' });
    }
  };

  // Get roles by user ID
exports.getRolesByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find all role IDs associated with the given user ID from UserRole
      const userRoleIds = await UserRole.findAll({
        where: { user_id: userId },
        attributes: ['role_id'], // Select only role_id field
      });
  
      if (userRoleIds.length === 0) {
        return res.status(404).json({ message: 'No roles found for the given user ID' });
      }
  
      // Extract role IDs from the result
      const roleIds = userRoleIds.map((userRole) => userRole.role_id);
  
      // Retrieve all roles with the extracted role IDs
      const roles = await Role.findAll({
        where: { id: roleIds },
      });
  
      if (roles) {
        res.json(roles);
      } else {
        res.status(404).json({ message: 'No roles found for the given user ID' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve roles by user ID' });
    }
  };


  
