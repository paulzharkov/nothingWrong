const { Router } = require('express');
const postsController = require('../controllers/posts');

const router = Router();

router.get('/account', postsController.account);

router.get('/advice', postsController.advice);

router.get('/post/:id', postsController.allMessages);

router.post('/wrong', postsController.makewrong);

router.get('/wrong/:id', postsController.oneWrong);

router.post('/wrong/answer/:id', postsController.changeAnswer);

module.exports = router;
