const express = require('express');
const adminController = require('../controllers/adminController');
const adminRouter = express.Router();


/**
 * Use a POST request on http://localhost:5656/api/admin/login to validate login info of user.
 */
adminRouter.route('/login')
    .post(adminController.loginAdmin)

/**
 * Use a GET request on http://localhost:5656/api/admin/authenticate-session to check info of current user
 */
adminRouter.route('/authenticate-session')
    .get(adminController.getAdminLogin)

/**
 * Use a GET request on http://localhost:5656/api/admin/logout to remove current session
 */
adminRouter.route('/logout')
    .get(adminController.logoutAdmin)


module.exports = adminRouter