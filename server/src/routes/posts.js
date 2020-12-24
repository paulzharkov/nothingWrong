const { Router } = require('express');
const postsController = require('../controllers/posts');

const router = Router();

router.get('/lk', postsController.cabinet);

router.get('/lenta', postsController.lenta);

router.get('/lenta/:id', postsController.postId);

router.post('/lenta/:id', postsController.postComment);

// router.patch('/lenta/:id', postsController.patchPost);

router.delete('/lenta/:id', postsController.deletePost);

router.patch('/lenta/:id', postsController.likePost);

router.get('/peoples/all', postsController.peoplesAll);

router.get('/peoples/subscribers', postsController.peoplesSubscribers);

router.get('/stats/offended', postsController.statsOffended);

router.get('/stats/offender', postsController.statsOffender);

router.get('/advices', postsController.advices);

router.post('/wrong', postsController.makewrong);

router.get('/post/:id', postsController.allMessages);

router.get('/wrong/:id', postsController.oneWrong);


module.exports = router;
