const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');
const PermissionController = require('../controllers/permissionController');
const UserController = require('../controllers/userController');
const RolePermissionController = require('../controllers/rolePermissionController');
const UserRoleController = require('../controllers/userRoleController');
const AuditLogController = require('../controllers/auditLogController');


// Role Routes
router.post('/roles', RoleController.createRole);
router.put('/roles/:roleId', RoleController.updateRoleById);
router.delete('/roles/:roleId', RoleController.deleteRoleById);
router.get('/roles', RoleController.getAllRoles);

//role permission
router.post('/roles-permissions', RolePermissionController.createRolePermission);
router.delete('/role_permissions/:roleId/:permissionId', RolePermissionController.deleteRolePermissionByPermissionAndRole);
router.get('/roles-permissions', RolePermissionController.getAllRolePermissions);
router.get('/roles-permissions/permissions/:roleId', RolePermissionController.getPermissionsByRoleId);

//user role
router.post('/user-role', UserRoleController.createUserRole);
router.delete('/user-role/:userId/:roleId', UserRoleController.deleteUserRoleById);
router.get('/user-role', UserRoleController.getAllUserRoles);
router.get('/user-role/users/:roleId', UserRoleController.getUsersByRoleId);
router.get('/user-role/roles/:userId', UserRoleController.getRolesByUserId);

// Permission Routes
router.post('/permissions', PermissionController.createPermission);
router.put('/permissions/:permissionId', PermissionController.updatePermissionById);
router.delete('/permissions/:permissionId', PermissionController.deletePermissionById);
router.get('/permissions', PermissionController.getAllPermissions);

// User Routes
router.post('/users', UserController.createUser);
router.put('/users/:userId', UserController.updateUserById);
router.delete('/users/:userId', UserController.deleteUserById);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.put('/users/:userId/change-password', UserController.changeUserPassword);

//audit log
router.post('/audit', AuditLogController.createAuditLog);
router.get('/audit', AuditLogController.getAllAuditLogs);
router.get('/audit/:auditLogId', AuditLogController.getAuditLogById);


module.exports = router;
