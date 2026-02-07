import { NotFoundError, ValidationError } from '../../shared/errors/AppError.js';
import { validateRequiredFields, validateString } from '../../shared/utils/validate.js';

/**
 * Business logic for blog posts
 * Follows single responsibility principle
 */
export class PostService {
  constructor() {
    // In-memory storage for demo purposes
    this.posts = new Map();
    this.nextId = 1;
  }

  /**
   * Creates a new blog post
   * @param {Object} postData - Post data (title, content, author)
   * @returns {Object} Created post with id and timestamp
   */
  createPost(postData) {
    validateRequiredFields(postData, ['title', 'content', 'author']);
    validateString(postData.title, 'Title');
    validateString(postData.content, 'Content');
    validateString(postData.author, 'Author');

    const post = {
      id: this.nextId++,
      title: postData.title.trim(),
      content: postData.content.trim(),
      author: postData.author.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.posts.set(post.id, post);
    return post;
  }

  /**
   * Retrieves all posts
   * @returns {Array} Array of all posts
   */
  getAllPosts() {
    return Array.from(this.posts.values());
  }

  /**
   * Retrieves a single post by ID
   * @param {number} id - Post ID
   * @returns {Object} Post object
   * @throws {NotFoundError} If post not found
   */
  getPostById(id) {
    const post = this.posts.get(Number(id));
    if (!post) {
      throw new NotFoundError(`Post with id ${id} not found`);
    }
    return post;
  }

  /**
   * Updates an existing post
   * @param {number} id - Post ID
   * @param {Object} updateData - Fields to update
   * @returns {Object} Updated post
   * @throws {NotFoundError} If post not found
   */
  updatePost(id, updateData) {
    const post = this.getPostById(id);

    if (updateData.title !== undefined) {
      validateString(updateData.title, 'Title');
      post.title = updateData.title.trim();
    }

    if (updateData.content !== undefined) {
      validateString(updateData.content, 'Content');
      post.content = updateData.content.trim();
    }

    post.updatedAt = new Date().toISOString();
    this.posts.set(post.id, post);
    return post;
  }

  /**
   * Deletes a post
   * @param {number} id - Post ID
   * @throws {NotFoundError} If post not found
   */
  deletePost(id) {
    const post = this.getPostById(id);
    this.posts.delete(post.id);
  }
}
