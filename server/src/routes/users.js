const { Router } = require('express');
const usersController = require('../controllers/users');

const router = Router();

router.post('/signup', usersController.userSignup);

router.post('/signin', usersController.userSignin);

router.get('/signout', usersController.userSignout);

module.exports = router;
