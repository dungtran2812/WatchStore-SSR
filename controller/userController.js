const Member = require('../models/member')
const bcrypt = require('bcrypt');
class UserController {
  getLoginPage(req, res) {
    const err = req.session.err || null;
    req.session.err = null;
    res.render('login', { err: err });
  }

  getRegisterPage(req, res) {
    const err = req.session.err || null;
    req.session.err = null;
    res.render('register', { err: err });
  }
  login(req, res) {
    const { username, password } = req.body;

    // Find the member by username
    Member.findOne({ membername: username })
      .then((member) => {
        if (!member) {
          // Handle if no member is found
          req.session.err = 'User not found';
          res.redirect('/users/login');
        }

        // Compare the password using bcrypt
        bcrypt.compare(password, member.password, (err, isMatch) => {
          console.log('match', isMatch)
          if (err) throw err;

          if (isMatch) {
            // Store member data in session
            req.session.member = member;
            // Redirect to home page
            if (member.isAdmin) {
              res.redirect('/dashboard');
            } else {
              res.redirect('/');
            }

          } else {
            // Handle invalid password
            req.session.err = 'Invalid password';
            res.redirect('/users/login');
          }
        });
      })
      .catch((err) => {
        console.log(err);
        res.render('login', { error: 'An error occurred' });
      });
  }
  register(req, res) {
    const { membername, password } = req.body;
    console.log(req.body)
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, function (err, hash) {
        Member.findOne({ membername: membername })
          .then((member) => {
            if (member) {
              req.session.err = 'Member Name already exist';
              res.redirect('/users/register')
              req.session.err = null
            } else {
              Member.create({ membername: membername, password: hash })
            }
          })

          .then(() => {
            res.redirect('/users/login')
          })
          .catch((err) => console.log(err))
      });
    })

  }
  logout(req, res) {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }
      res.redirect('/users/login'); // Redirect to login page after logout
    });
  }
  async getUsermngPage(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;
    const users = await Member.find({})
    if (member?.isAdmin) {
      res.render('userManagement', { err: err, Member: member, users: users });
    } else {
      res.redirect('/');
    }

  }
  getProfilePage(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;
    Member.findById(member._id)
      .then((member) => {
        if (!member.isAdmin) {
          res.render('memberProfile', { err: err, user: member });
        }
        else if (member.isAdmin) {
          res.render('adminProfile', { err: err, user: member });
        }
        else {
          res.redirect('/');
        }
      })


  }
  getEditProfile(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;
    Member.findById(member._id)
      .then((member) => {
        if (!member?.isAdmin) {
          res.render('editProfileMember', { err: err, user: member });
        }
        else if (member?.isAdmin) {
          res.render('editProfileAdmin', { err: err, user: member });
        }
        else {
          res.redirect('/');
        }
      })

  }
  editProfile(req, res) {
    const member = req.session.member || null;
    const err = req.session.err || null;
    req.session.err = null;
    console.log(req.body)
    Member.findOneAndUpdate({ _id: member._id }, req.body)
      .then(() => {
        res.redirect(`/users/profile`);
      })
  }
}

module.exports = new UserController