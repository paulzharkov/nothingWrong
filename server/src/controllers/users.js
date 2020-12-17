const bcrypt = require('bcrypt');
// const User = require('../models/user.model');

const userSignup = async (req, res) => {
  const { name, email, pass } = req.body;

  if (name && email && pass) {
    try {
      const hashPass = await bcrypt.hash(pass, 10);
      const user = new User({
        name,
        email,
        pass: hashPass,
        date: Date.now(),
      });

      await user.save();

      req.session.user = {
        id: user._id,
        name: user.name,
      };

      // return res.redirect('/secret'); 
    } catch (error) {
      // return res.redirect('/');
    }
  }
  // return res.redirect('/users/signup');
};

const userSignin = async (req, res) => {
  const { email, pass } = req.body;
  if (email && pass) {
    try {
      const currentUser = await User.findOne({ email });
      if (currentUser) {
        if (await bcrypt.compare(pass, currentUser.pass)) {
          req.session.user = {
            id: currentUser._id,
            name: currentUser.name,
          };

          // return res.redirect('/secret');
        }
      }
    } catch (error) {
      // return res.redirect('/');
    }
  }
  // return res.redirect('/users/signin');
};

const userSignout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.render('error', { error: err });
    res.clearCookie('sid');

    // return res.redirect('/');
  });
};

module.exports = {
  userSignup,
  userSignin,
  userSignout,
};
