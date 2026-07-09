# AGENTS.md for Docondee Website

## Project Overview
Docondee - Andy Holst's consultancy delivering secure, scalable solutions.

## Architecture
```
docondee-site/
├── assets/           # Images and static assets
├── css/              # Stylesheets
├── js/               # JavaScript files
├── tests/            # Test suite
│   ├── unit/         # Jest unit tests
│   └── browser/      # Playwright browser tests
└── dagger/           # Dagger CI/CD pipeline
```

## Development Commands

| Command | Action |
|---------|--------|
| `make build` | Build static site (copy assets) |
| `make test` | Run all tests |
| `make test-units` | Run unit tests only |
| `make test-browser` | Run browser tests only |
| `make verify-build` | Verify build output |
| `make check-links` | Check for forbidden links |
| `make dagger-test` | Run full Dagger pipeline |

## Guardrails
- No YouTube links
- No Calendly links
- No book-call links
- All tests must pass before merge
- Dagger pipeline must complete successfully

## Contact
- Maintainer: Dev Harness (dev@docondee.local)
- Last updated: 2026-07-08
