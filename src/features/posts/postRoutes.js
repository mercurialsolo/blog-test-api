import express from 'express';
import { PostService } from './PostService.js';
import { PostController } from './PostController.js';

/**
 * Post routes factory
 * Creates and configures post routes with dependencies
 */
export const createPostRoutes = () => {
  const router = express.Router();
  const postService = new PostService();
  const postController = new PostController(postService);

  router.post('/', postController.createPost);
  router.get('/', postController.getAllPosts);
  router.get('/:id', postController.getPostById);
  router.patch('/:id', postController.updatePost);
  router.delete('/:id', postController.deletePost);

  return router;
};
