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
userRouter.route('/mng')
.get(userController.getUsermngPage)
userRouter.route('/profile')
.get(userController.getProfilePage)
userRouter.route('/edit/:id')
.get(userController.getEditProfile)
.post(userController.editProfile)

module.exports = userRouter;
