/**
 * Test fixtures for posts
 */
export const validPost = {
  title: 'Test Post',
  content: 'This is a test post content',
  author: 'Test Author',
};

export const validPosts = [
  {
    title: 'First Post',
    content: 'Content of first post',
    author: 'Author One',
  },
  {
    title: 'Second Post',
    content: 'Content of second post',
    author: 'Author Two',
  },
  {
    title: 'Third Post',
    content: 'Content of third post',
    author: 'Author Three',
  },
];

export const invalidPost = {
  title: 'Missing content and author',
};
