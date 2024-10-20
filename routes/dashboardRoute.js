var express = require('express');
const dashboardController = require('../controller/dashboardController')
var dashboardRoute = express.Router();

/* GET home page. */
dashboardRoute.route('/')
  .get(dashboardController.getDashboardPage)
dashboardRoute.route('/edit/:id')
  .get(dashboardController.getEditWatchPage)
  .post(dashboardController.editWatchPage)
dashboardRoute.route('/add')
  .get(dashboardController.getAddWatchPage)
  .post(dashboardController.addWatch)
dashboardRoute.route('/delete/:id')
  .post(dashboardController.deleteWatch)
module.exports = dashboardRoute;
