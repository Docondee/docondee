# Agent Behaviors - Docondee

## Build Behavior
1. Static site generator (no framework - pure HTML/CSS/JS)
2. Assets copied to dist/ on build
3. No build artifacts in source

## Test Behavior
1. Unit tests check HTML structure
2. Browser tests verify page load
3. Link checks prevent external service references

## Guardrails
- Forbidden: YouTube links
- Forbidden: Calendly links  
- Forbidden: Book-call links
- Required: All Makefile targets pass
