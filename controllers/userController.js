const bcrypt = require('bcrypt');
const User = require('../models/User');
const PasswordHistory = require('../models/PasswordHistory');
const { Op } = require("sequelize");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, ...optionalFields } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and store hashed password
    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
      ...optionalFields, // Include optional fields here
    });

    // Store the new password in the PasswordHistory table
    await PasswordHistory.create({
      user_id: newUser.id,
      password_hash: hashedPassword,
    });

    // Prepare the response object excluding the password hash
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(201).json({ message: 'User created successfully', user: userResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User creation failed' });
  }
};



// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, ...otherUpdatedFields } = req.body;

    // Check for uniqueness only if username or email are provided
    if (username || email) {
      let condition = { id: { [Op.ne]: userId } };
      let conditionOr = {};

      if (username) {
        conditionOr.username = username;
      }
      if (email) {
        conditionOr.email = email;
      }

      if (Object.keys(conditionOr).length > 0) {
        condition[Op.or] = conditionOr;
      }

      const existingUser = await User.findOne({ where: condition });

      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }
    }

    // Include username and email in updatedFields if they are present
    let updatedFields = { ...otherUpdatedFields };
    if (username) {
      updatedFields.username = username;
    }
    if (email) {
      updatedFields.email = email;
    }

    const [rowsUpdated] = await User.update(updatedFields, { where: { id: userId } });

    if (rowsUpdated === 1) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User update failed' });
  }
};


// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user
    const rowsDeleted = await User.destroy({
      where: { id: userId }
    });

    if (rowsDeleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      // No rows deleted means no user was found with that ID
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User deletion failed' });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all users without sensitive information
    const users = await User.findAll({
      attributes: { 
        exclude: ['password_hash'] // Exclude password_hash and other sensitive fields
      }
    });

    // Return the list of users
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve user by ID without sensitive information
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password_hash'] // Exclude password_hash and other sensitive fields
      }
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};


// Change user password
exports.changeUserPassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { newPassword } = req.body;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Implement change password logic here
    const updatedUser = await User.update(
      {
        password_hash: hashedPassword,
        password_last_changed: new Date(),
      },
      { where: { id: userId } }
    );

    if (updatedUser[0] === 1) {
      // Store the new password in the PasswordHistory table
      await PasswordHistory.create({
        user_id: userId,
        password_hash: hashedPassword,
      });

      res.json({ message: 'Password changed successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Password change failed' });
  }
};
