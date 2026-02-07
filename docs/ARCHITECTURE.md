# Architecture Documentation

## Overview

This project follows a feature-based architecture with clear separation of concerns and adherence to SOLID principles.

## Project Structure

### Feature-Based Organization

Code is organized by feature rather than technical layer:

```
src/
├── features/
│   └── posts/           # Posts feature
│       ├── PostService.js      # Business logic
│       ├── PostController.js   # HTTP handlers
│       └── postRoutes.js       # Route definitions
├── shared/              # Shared code
│   ├── errors/          # Error classes
│   ├── middleware/      # Express middleware
│   └── utils/           # Utility functions
└── config/              # Configuration
```

### Benefits

1. **Modularity**: Each feature is self-contained
2. **Scalability**: Easy to add new features
3. **Maintainability**: Clear boundaries between features
4. **Testability**: Features can be tested in isolation

## Core Principles

### 1. DRY (Don't Repeat Yourself)

- Validation logic centralized in `shared/utils/validate.js`
- Error handling centralized in `shared/middleware/errorHandler.js`
- Configuration in single source of truth: `config/index.js`

### 2. SOLID Principles

- **Single Responsibility**: Each class has one reason to change
  - `PostService`: Business logic only
  - `PostController`: HTTP handling only
  - Validators: Validation logic only

- **Open/Closed**: Extensible without modification
  - New features can be added without changing existing code
  - Error classes can be extended for specific error types

- **Dependency Inversion**: Depend on abstractions
  - Controller depends on service interface, not implementation
  - Middleware is decoupled from business logic

### 3. Error Handling

- Typed error classes extending `AppError`
- Centralized error middleware
- Operational vs non-operational error distinction
- Appropriate HTTP status codes

### 4. Testing Strategy

Following the testing pyramid:

- **70% Unit Tests**: `PostService`, validators
- **20% Integration Tests**: API endpoints
- **10% E2E Tests**: (Future work)

Test files mirror source structure for easy navigation.

## Data Flow

```
Request → Express Middleware → Routes → Controller → Service → Response
                                  ↓
                            Error Handler
```

1. Request enters through Express middleware (JSON parsing)
2. Routes match URL to controller method
3. Controller extracts request data, calls service
4. Service performs business logic, validation
5. Controller formats response
6. Error handler catches any errors

## Scaling Considerations

### Current State (In-Memory)

- Posts stored in Map for simplicity
- Suitable for development/testing
- No persistence between restarts

### Future Enhancements

1. **Database Layer**: Add repository pattern
2. **Caching**: Add Redis for frequently accessed data
3. **Authentication**: Add auth middleware
4. **Rate Limiting**: Protect against abuse
5. **Logging**: Structured logging with Winston

## Adding New Features

To add a new feature (e.g., users):

1. Create `src/features/users/` directory
2. Add `UserService.js` for business logic
3. Add `UserController.js` for HTTP handlers
4. Add `userRoutes.js` for route definitions
5. Register routes in `src/index.js`
6. Add tests in `tests/unit/` and `tests/integration/`

Each feature follows the same pattern, ensuring consistency.
