var express = require('express');
const dashboardController = require('../controller/dashboardController')
var dashboardRoute = express.Router();

/* GET home page. */
dashboardRoute.route('/')
.get(dashboardController.getDashboardPage)

module.exports = dashboardRoute;
