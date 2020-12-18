const { Router } = require('express');
const usersController = require('../controllers/users');

const router = Router();

router.route('/signup').post(usersController.userSignup);

router.post('/signin', usersController.userSignin);

router.get('/signout', usersController.userSignout);

module.exports = router;
