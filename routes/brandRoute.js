var express = require('express');
const brandController = require('../controller/brandController');
var brandRoute = express.Router();

/* GET brand management page. */
brandRoute.route('/')
  .get(brandController.getBrandPage);

brandRoute.route('/edit/:id')
  .get(brandController.getEditBrandPage)
  .post(brandController.editBrandPage);

brandRoute.route('/add')
  .get(brandController.getAddBrandPage)
  .post(brandController.addBrand);

brandRoute.route('/delete/:id')
  .post(brandController.deleteBrand);

module.exports = brandRoute;
