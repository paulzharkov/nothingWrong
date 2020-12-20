const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const userSignup = async (req, res) => {
  const { login, email, pass } = req.body;

  if (login && email && pass) {
    try {
      const hashPass = await bcrypt.hash(pass, 10);
      const user = new User({
        login,
        email,
        pass: hashPass,
      });

      await user.save();

      req.session.user = {
        id: user._id,
        login: user.login,
      };

      return res.json(user.login);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
  return res.sendStatus(404);
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
            login: currentUser.login,
          };

          return res.json(currentUser.login);
        }
      }
    } catch (error) {
      return res.sendStatus(404);
    }
  } else {
    return res.sendStatus(404);
  }
};

const userSignout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.render('error', { error: err });
    res.clearCookie('sid');

    return res.sendStatus(200);
  });
};

module.exports = {
  userSignup,
  userSignin,
  userSignout,
};
