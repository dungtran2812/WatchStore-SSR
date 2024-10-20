const Member = require('../models/member');
const Watch = require('../models/watch');
class dashboardController {
  // const member = req.session.member || null; // Get member from session or null if not logged in
  //   const err = req.session.err || null; 
  //   req.session.err = null;
  getDashboardPage(req,res) {
    const member = req.session.member || null;
    const err = req.session.err || null; 
    req.session.err = null;
    console.log(member)
    if (member?.isAdmin) {
      Watch.find({})
        .then((watch) => {
          res.render('dashboard', {Watch: watch, Member: member, err: err})
        })

    } else {
      res.redirect('/')
    }
  }
}
module.exports = new dashboardController();