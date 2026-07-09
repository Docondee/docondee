# Harness Operations - Docondee

## Trigger Conditions
- When working on Docondee website
- When build/test pipeline is needed
- When verifying HTML site functionality

## Prerequisites
- Node.js >= 18.0.0
- npm
- Make
- Dagger (optional, for CI/CD)

## Quick Commands

### Build & Verify
```bash
make build         # Generate dist/ directory
make verify-build  # Build + validate output exists
```

### Testing
```bash
make test-units    # Run Jest unit tests (9 tests)
make test-browser  # Run Playwright browser tests
make test          # Run all tests
```

### Link Validation
```bash
make check-links   # Verify no YouTube/Calendly/book-call links
npm run check:forbidden-links
```

### Full Pipeline
```bash
make dagger-test   # Dagger CI/CD pipeline
```

## Verification Gate
All tests must pass. No forbidden links allowed in source files.
