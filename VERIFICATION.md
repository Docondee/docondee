# Verification Gates for Docondee

## Quality Criteria
- Build completes without errors
- No YouTube, Calendly, or book-call links in source
- All unit tests pass
- Browser tests verify page loads correctly

## Make Targets
- `make build` - Prepare distribution
- `make test` - Run Jest + Playwright
- `make check-links` - Verify no forbidden links
- `make dagger-test` - Full pipeline via Dagger
