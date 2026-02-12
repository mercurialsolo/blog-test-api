import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../../src/index.js';

describe('Posts API Integration Tests', () => {
  let server;

  beforeAll(() => {
    server = app;
  });

  afterAll((done) => {
    if (server && server.close) {
      server.close(done);
    } else {
      done();
    }
  });

  describe('POST /api/v1/posts', () => {
    it('should create a new post', async () => {
      const response = await request(server)
        .post('/api/v1/posts')
        .send({
          title: 'Integration Test Post',
          content: 'This is a test post',
          author: 'Test Author',
        })
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toMatchObject({
        title: 'Integration Test Post',
        content: 'This is a test post',
        author: 'Test Author',
      });
    });

    it('should return 400 for invalid post data', async () => {
      const response = await request(server)
        .post('/api/v1/posts')
        .send({
          title: 'Missing content and author',
        })
        .expect(400);

      expect(response.body.status).toBe('error');
    });
  });

  describe('GET /api/v1/posts', () => {
    it('should return all posts', async () => {
      const response = await request(server)
        .get('/api/v1/posts')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(server)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.timestamp).toBeDefined();
    });
  });
});
