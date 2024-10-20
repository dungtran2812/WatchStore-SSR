var express = require('express');
const homeController = require('../controller/homeController')
var indexRouter = express.Router();

/* GET home page. */
indexRouter.route('/')
.get(homeController.getHomePage)
indexRouter.route('/shop')
.get(homeController.getShopPage)
indexRouter.route('/shop/details/:id')
.get(homeController.getWatchDetailPage)
.post(homeController.postComment)

module.exports = indexRouter;
