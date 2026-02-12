# Blog Test Project

A modern blog application with comprehensive testing infrastructure.

## Project Structure

```
blog-test/
├── src/
│   ├── features/          # Feature-based organization
│   │   ├── posts/         # Blog posts feature
│   │   └── users/         # User management feature
│   ├── shared/            # Shared utilities and types
│   │   ├── utils/         # Common utilities
│   │   ├── middleware/    # Express middleware
│   │   └── errors/        # Error handling
│   ├── config/            # Configuration
│   └── index.js           # Application entry point
├── tests/                 # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── fixtures/          # Test fixtures
└── docs/                  # Documentation
```

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Architecture Principles

- **Feature-based organization**: Code organized by features, not technical layers
- **Modularity**: Clear boundaries between features
- **DRY**: Single source of truth for shared logic
- **SOLID**: Following SOLID principles throughout
- **Testing pyramid**: 70% unit tests, 20% integration, 10% e2e

## License

MIT
