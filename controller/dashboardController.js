const Brand = require('../models/brand');
const Member = require('../models/member');
const Watch = require('../models/watch');
const mongoose = require('mongoose')

class dashboardController {
  // const member = req.session.member || null; // Get member from session or null if not logged in
  //   const err = req.session.err || null; 
  //   req.session.err = null;
  getDashboardPage(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;

    if (member?.isAdmin) {
      Watch.find({})
        .populate('brand')
        .then((watch) => {
          Brand.find({})
            .then((brand) => {
              console.log(brand)
              res.render('dashboard', { Watch: watch, brands: brand, Member: member, err: err })
            })

        })

    } else {
      res.redirect('/')
    }
  }
  getEditWatchPage(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;
    if (member?.isAdmin) {
      Watch.findOne({ _id: req.params.id })
        .then((watch) => {
          Brand.find({})
            .then((brands) => {
              res.render('editWatch', { Watch: watch, brands: brands, Member: member, err: err })
            })

        })

    } else {
      res.redirect('/')
    }
  }
  async getAddWatchPage(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;
    const brands = await Brand.find({})
    console.log("brand", brands)
    if (member?.isAdmin) {
      res.render('addWatch', { brands: brands, Member: member, err: err })
    } else {
      res.redirect('/')
    }
  }
  addWatch(req, res) {
    const { watchName, image, price, Automatic, watchDescription, brand } = req.body;
    const member = req.session.member || null;
    try {
      if (member?.isAdmin) {
        Watch.create({
          ...req.body,
          brand: new mongoose.Types.ObjectId(brand),
          Automatic: Automatic == "true" ? true : false,

        })
          .then((watch) => {
            console.log(watch)
            res.redirect("/dashboard")
          })
      } else {
        res.redirect('/')
      }
    } catch (error) {
      console.log(error)
      req.session.err = error;
    }
  }
  editWatchPage(req, res) {
    const { watchName, image, price, Automatic, watchDescription, brand } = req.body;
    const member = req.session.member || null;
    try {
      if (member?.isAdmin) {
        Watch.findOneAndUpdate({ _id: req.params.id }, {
          watchName,
          image,
          price,
          Automatic: Automatic == "true" ? true : false,
          watchDescription,
          brand: new mongoose.Types.ObjectId(brand),
        }, { new: true })
          .then((watch) => {
            console.log(watch)
            res.redirect(`/dashboard/edit/${watch._id}`)
          })
      } else {
        res.redirect('/')
      }
    } catch (error) {
      console.log(error)
      req.session.err = error;
    }
  }
  deleteWatch(req,res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    try {
      const { id } = req.params
      Watch.findByIdAndDelete({_id: id})
       .then(() => {
        res.redirect('/dashboard')
       })
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new dashboardController();