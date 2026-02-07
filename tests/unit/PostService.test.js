import { describe, it, expect, beforeEach } from '@jest/globals';
import { PostService } from '../../src/features/posts/PostService.js';
import { NotFoundError, ValidationError } from '../../src/shared/errors/AppError.js';

describe('PostService', () => {
  let postService;

  beforeEach(() => {
    postService = new PostService();
  });

  describe('createPost', () => {
    it('should create a post with valid data', () => {
      const postData = {
        title: 'Test Post',
        content: 'Test content',
        author: 'John Doe',
      };

      const post = postService.createPost(postData);

      expect(post).toMatchObject({
        id: 1,
        title: 'Test Post',
        content: 'Test content',
        author: 'John Doe',
      });
      expect(post.createdAt).toBeDefined();
      expect(post.updatedAt).toBeDefined();
    });

    it('should throw ValidationError when title is missing', () => {
      const postData = {
        content: 'Test content',
        author: 'John Doe',
      };

      expect(() => postService.createPost(postData)).toThrow(ValidationError);
    });

    it('should throw ValidationError when content is missing', () => {
      const postData = {
        title: 'Test Post',
        author: 'John Doe',
      };

      expect(() => postService.createPost(postData)).toThrow(ValidationError);
    });

    it('should trim whitespace from fields', () => {
      const postData = {
        title: '  Test Post  ',
        content: '  Test content  ',
        author: '  John Doe  ',
      };

      const post = postService.createPost(postData);

      expect(post.title).toBe('Test Post');
      expect(post.content).toBe('Test content');
      expect(post.author).toBe('John Doe');
    });
  });

  describe('getAllPosts', () => {
    it('should return empty array when no posts exist', () => {
      const posts = postService.getAllPosts();
      expect(posts).toEqual([]);
    });

    it('should return all posts', () => {
      postService.createPost({
        title: 'Post 1',
        content: 'Content 1',
        author: 'Author 1',
      });
      postService.createPost({
        title: 'Post 2',
        content: 'Content 2',
        author: 'Author 2',
      });

      const posts = postService.getAllPosts();
      expect(posts).toHaveLength(2);
    });
  });

  describe('getPostById', () => {
    it('should return post when it exists', () => {
      const created = postService.createPost({
        title: 'Test Post',
        content: 'Test content',
        author: 'John Doe',
      });

      const post = postService.getPostById(created.id);
      expect(post).toEqual(created);
    });

    it('should throw NotFoundError when post does not exist', () => {
      expect(() => postService.getPostById(999)).toThrow(NotFoundError);
    });
  });

  describe('updatePost', () => {
    it('should update post title', () => {
      const created = postService.createPost({
        title: 'Original Title',
        content: 'Test content',
        author: 'John Doe',
      });

      const updated = postService.updatePost(created.id, {
        title: 'Updated Title',
      });

      expect(updated.title).toBe('Updated Title');
      expect(updated.content).toBe('Test content');
    });

    it('should update post content', () => {
      const created = postService.createPost({
        title: 'Test Post',
        content: 'Original content',
        author: 'John Doe',
      });

      const updated = postService.updatePost(created.id, {
        content: 'Updated content',
      });

      expect(updated.content).toBe('Updated content');
    });

    it('should throw NotFoundError when post does not exist', () => {
      expect(() => postService.updatePost(999, { title: 'New Title' })).toThrow(
        NotFoundError
      );
    });
  });

  describe('deletePost', () => {
    it('should delete existing post', () => {
      const created = postService.createPost({
        title: 'Test Post',
        content: 'Test content',
        author: 'John Doe',
      });

      postService.deletePost(created.id);

      expect(() => postService.getPostById(created.id)).toThrow(NotFoundError);
    });

    it('should throw NotFoundError when post does not exist', () => {
      expect(() => postService.deletePost(999)).toThrow(NotFoundError);
    });
  });
});
