const AuditLog = require('../models/AuditLog');
const User = require('../models/User');

// Create a new audit log
exports.createAuditLog = async (req, res) => {
  try {
    const { user_id, action, details } = req.body;

    // Check if the user exists
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the audit log entry
    const newAuditLog = await AuditLog.create({
      user_id,
      action,
      details,
    });

    res.status(201).json({ message: 'Audit log created successfully', auditLog: newAuditLog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Audit log creation failed' });
  }
};

// Get all audit logs
exports.getAllAuditLogs = async (req, res) => {
  try {
    // Implement audit log listing logic here
    const auditLogs = await AuditLog.findAll();
    res.json(auditLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve audit logs' });
  }
};

// Get audit log by ID
exports.getAuditLogById = async (req, res) => {
  try {
    const auditLogId = req.params.auditLogId;

    // Implement audit log retrieval by ID logic here
    const auditLog = await AuditLog.findByPk(auditLogId);

    if (auditLog) {
      res.json(auditLog);
    } else {
      res.status(404).json({ message: 'Audit log not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve audit log' });
  }
};

module.exports = exports;
