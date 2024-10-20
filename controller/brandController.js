const Brand = require('../models/brand');
const Member = require('../models/member');
const mongoose = require('mongoose');

class brandController {
  // Get Brand Management Page
  getBrandPage(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;

    if (member?.isAdmin) {
      Brand.find({})
        .then((brands) => {
          res.render('brandManagement', { brands: brands, Member: member, err: err });
        });
    } else {
      res.redirect('/');
    }
  }

  // Get Add Brand Page
  async getAddBrandPage(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;

    if (member?.isAdmin) {
      res.render('addBrand', { Member: member, err: err });
    } else {
      res.redirect('/');
    }
  }

  // Add a New Brand
  addBrand(req, res) {
    const { brandName } = req.body;
    const member = req.session.member || null;

    try {
      if (member?.isAdmin) {
        Brand.create({ brandName })
          .then((brand) => {
            console.log(brand);
            res.redirect('/brand-mng');
          });
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.log(error);
      req.session.err = error;
    }
  }

  // Get Edit Brand Page
  getEditBrandPage(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;

    if (member?.isAdmin) {
      Brand.findOne({ _id: req.params.id })
        .then((brand) => {
          res.render('editBrand', { Brand: brand, Member: member, err: err });
        });
    } else {
      res.redirect('/');
    }
  }

  // Edit a Brand
  editBrandPage(req, res) {
    const { brandName } = req.body;
    const member = req.session.member || null;

    try {
      if (member?.isAdmin) {
        Brand.findOneAndUpdate({ _id: req.params.id }, { brandName }, { new: true })
          .then((brand) => {
            console.log(brand);
            res.redirect(`/brand-mng`);
          });
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.log(error);
      req.session.err = error;
    }
  }

  // Delete a Brand
  deleteBrand(req, res) {
    const member = req.session.member || null;
    try {
      const { id } = req.params;
      if (member?.isAdmin) {
        Brand.findByIdAndDelete({ _id: id })
          .then(() => {
            res.redirect('/brand-mng');
          });
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.log(error);
      req.session.err = error;
    }
  }
}

module.exports = new brandController();
