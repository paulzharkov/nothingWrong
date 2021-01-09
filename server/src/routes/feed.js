const { Router } = require('express');
const feedController = require('../controllers/feed');

const router = Router();

router.get('/', feedController.lenta);

router.get('/:id', feedController.postId);

router.post('/:id', feedController.postComment);

// router.patch('/:id', feedController.patchPost);

router.delete('/:id', feedController.deletePost);

router.patch('/:id', feedController.likePost);

module.exports = router;
