var express = require('express');
const userController = require('../controller/userController');
var userRouter = express.Router();

/* GET users listing. */
userRouter.route('/login')
.get(userController.getLoginPage)
.post(userController.login)

userRouter.route('/register')
.get(userController.getRegisterPage)
.post(userController.register)

userRouter.route('/logout')
.get(userController.logout)

module.exports = userRouter;
