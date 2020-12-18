const User = require('../models/user.model');

const checkAuth = async (req, res, next) => {
  const userId = req.session?.user?.id;

  if (userId) {
    const user = await User.findById(userId);
    if (user) {
      res.locals.name = user.name;

      return next();
    }
    // return res.status(401).redirect('/');
  }
  // return res.status(401).redirect('/');
};

module.exports = {
  checkAuth,
};
