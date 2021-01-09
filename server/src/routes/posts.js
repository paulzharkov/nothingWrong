const { Router } = require('express');
const postsController = require('../controllers/posts');

const router = Router();

router.get('/lk', postsController.cabinet);

router.get('/peoples/all', postsController.peoplesAll);

router.get('/peoples/subscribers', postsController.peoplesSubscribers);

router.get('/stats/offended', postsController.statsOffended);

router.get('/stats/offender', postsController.statsOffender);

router.get('/advices', postsController.advices);

router.post('/wrong', postsController.makewrong);

router.get('/post/:id', postsController.allMessages);

router.get('/wrong/:id', postsController.oneWrong);

router.post('/wrong/answer/:id', postsController.changeAnswer);


module.exports = router;
