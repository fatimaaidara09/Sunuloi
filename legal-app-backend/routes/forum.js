const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const auth = require('../middleware/auth');
const { validatePost } = require('../middleware/validation');

// GET /api/forum/posts
router.get('/posts', forumController.getAllPosts);

// GET /api/forum/posts/search
router.get('/posts/search', forumController.searchPosts);

// GET /api/forum/categories
router.get('/categories', forumController.getCategories);

// GET /api/forum/posts/:id
router.get('/posts/:id', forumController.getPostById);

// POST /api/forum/posts
router.post('/posts', auth, validatePost, forumController.createPost);

// PUT /api/forum/posts/:id
router.put('/posts/:id', auth, forumController.updatePost);

// DELETE /api/forum/posts/:id
router.delete('/posts/:id', auth, forumController.deletePost);

// POST /api/forum/posts/:id/like
router.post('/posts/:id/like', auth, forumController.likePost);

// POST /api/forum/posts/:id/reply
router.post('/posts/:id/reply', auth, validatePost, forumController.replyToPost);

// POST /api/forum/posts/:id/mark-best-answer/:answerId
router.post('/posts/:id/mark-best-answer/:answerId', auth, forumController.markBestAnswer);

module.exports = router;
