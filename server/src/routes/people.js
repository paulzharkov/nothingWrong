const { Router } = require('express');
const peopleController = require('../controllers/people');

const router = Router();

router.get('/allpeople', peopleController.people);

router.get('/followers', peopleController.followers);

router.get('/allpeople/:id', peopleController.subscribe);

router.get('/followers/:id', peopleController.unSubscribe);

module.exports = router;
