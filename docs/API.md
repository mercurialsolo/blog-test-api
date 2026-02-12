# API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

## Endpoints

### Health Check

#### GET /health

Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-06T22:08:36.000Z"
}
```

---

## Posts

### Create Post

#### POST /api/v1/posts

Create a new blog post.

**Request Body:**
```json
{
  "title": "My First Post",
  "content": "This is the content of my first post",
  "author": "John Doe"
}
```

**Success Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content of my first post",
    "author": "John Doe",
    "createdAt": "2026-02-06T22:08:36.000Z",
    "updatedAt": "2026-02-06T22:08:36.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Missing required fields: content, author"
}
```

---

### Get All Posts

#### GET /api/v1/posts

Retrieve all blog posts.

**Success Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "First Post",
      "content": "Content of first post",
      "author": "Author One",
      "createdAt": "2026-02-06T22:08:36.000Z",
      "updatedAt": "2026-02-06T22:08:36.000Z"
    },
    {
      "id": 2,
      "title": "Second Post",
      "content": "Content of second post",
      "author": "Author Two",
      "createdAt": "2026-02-06T22:09:00.000Z",
      "updatedAt": "2026-02-06T22:09:00.000Z"
    }
  ]
}
```

---

### Get Post by ID

#### GET /api/v1/posts/:id

Retrieve a specific blog post by ID.

**URL Parameters:**
- `id` (number): Post ID

**Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "First Post",
    "content": "Content of first post",
    "author": "Author One",
    "createdAt": "2026-02-06T22:08:36.000Z",
    "updatedAt": "2026-02-06T22:08:36.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Post with id 999 not found"
}
```

---

### Update Post

#### PATCH /api/v1/posts/:id

Update an existing blog post. Only provided fields will be updated.

**URL Parameters:**
- `id` (number): Post ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Updated Title",
    "content": "Updated content",
    "author": "Author One",
    "createdAt": "2026-02-06T22:08:36.000Z",
    "updatedAt": "2026-02-06T22:15:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Post with id 999 not found"
}
```

---

### Delete Post

#### DELETE /api/v1/posts/:id

Delete a blog post.

**URL Parameters:**
- `id` (number): Post ID

**Success Response (204 No Content):**

No response body.

**Error Response (404 Not Found):**
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Post with id 999 not found"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Error description"
}
```

### Common Status Codes

- `200` - OK (successful GET, PATCH)
- `201` - Created (successful POST)
- `204` - No Content (successful DELETE)
- `400` - Bad Request (validation error)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (unexpected error)

## Example Usage

### Using cURL

Create a post:
```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My Post","content":"Post content","author":"John"}'
```

Get all posts:
```bash
curl http://localhost:3000/api/v1/posts
```

Get post by ID:
```bash
curl http://localhost:3000/api/v1/posts/1
```

Update a post:
```bash
curl -X PATCH http://localhost:3000/api/v1/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```

Delete a post:
```bash
curl -X DELETE http://localhost:3000/api/v1/posts/1
```
