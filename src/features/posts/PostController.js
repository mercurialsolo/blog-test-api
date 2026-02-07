/**
 * HTTP request handlers for posts
 * Thin layer that delegates to service
 */
export class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  createPost = async (req, res, next) => {
    try {
      const post = this.postService.createPost(req.body);
      res.status(201).json({
        status: 'success',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllPosts = async (req, res, next) => {
    try {
      const posts = this.postService.getAllPosts();
      res.status(200).json({
        status: 'success',
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const post = this.postService.getPostById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const post = this.postService.updatePost(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      this.postService.deletePost(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
