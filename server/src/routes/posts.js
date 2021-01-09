const { Router } = require('express');
const postsController = require('../controllers/posts');

const router = Router();

router.get('/account', postsController.cabinet);

router.get('/stats/offended', postsController.statsOffended);

router.get('/stats/offender', postsController.statsOffender);

router.get('/advice', postsController.advice);

router.post('/wrong', postsController.makewrong);

router.get('/post/:id', postsController.allMessages);

router.get('/wrong/:id', postsController.oneWrong);

router.post('/wrong/answer/:id', postsController.changeAnswer);

module.exports = router;
