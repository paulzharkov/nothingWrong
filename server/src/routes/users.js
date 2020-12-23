const { Router } = require('express');
const usersController = require('../controllers/users');

const router = Router();

router.post('/signup', usersController.userSignup);

router.post('/signin', usersController.userSignin);

router.get('/signout', usersController.userSignout);

router.get('/checkauth', usersController.checkAuth);

router.get('/people/allpeople', usersController.people);

router.get('/people/followers', usersController.followers);

router.get('/people/allpeople/:id', usersController.subscribe);

router.get('/people/followers/:id', usersController.unSubscribe);

module.exports = router;
