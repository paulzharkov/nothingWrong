const { Router } = require('express');
const postsController = require('../controllers/posts');

const router = Router();

router.get('/lk', postsController.cabinet);
router.get('/lenta', postsController.lenta);
router.get('/lenta/:id', postsController.postId);
router.post('/lenta/:id', postsController.postComment);
router.get('/peoples/all', postsController.peoplesAll);
router.get('/peoples/subscribers', postsController.peoplesSubscribers);
router.get('/stats/offended', postsController.statsOffended);
router.get('/stats/offender', postsController.statsOffender);
router.get('/advices', postsController.advices);
router.post('/makewrong', postsController.makewrong);
router.get('/chat/:post', postsController.chat);
router.post('/chat/:post', postsController.chatSendMessage);

module.exports = router;
