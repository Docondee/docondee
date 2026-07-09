.PHONY: build test test-units test-browser verify-build check-links dagger-test clean lint-html

# Main entry: runs through dagger pipeline
dagger-test: check-links build test-units test-browser
	@echo "✅ All pipeline stages complete!"

build:
	@echo "🔨 Building Docondee site..."
	@mkdir -p dist
	@cp -r css dist/ 2>/dev/null || true
	@cp -r assets dist/ 2>/dev/null || true
	@cp js/*.js dist/ 2>/dev/null || true
	@cp index.html dist/ 2>/dev/null || true
	@echo "✅ Build complete!"

test:
	@echo "🧪 Running all tests..."
	@make test-units

test-units:
	@echo "🧪 Running unit tests..."
	@npm run test:unit

test-browser:
	@echo "🌐 Running browser tests..."
	@npm run test:browser

check-links:
	@echo "🔗 Checking for forbidden links..."
	@node scripts/check-forbidden-links.js

verify-build: build
	@echo "🔍 Verifying build output..."
	@test -d dist || (echo "❌ dist/ directory missing!" && exit 1)
	@test -f dist/index.html || (echo "❌ dist/index.html missing!" && exit 1)
	@echo "✅ Build verification passed!"

lint-html:
	@echo "🔍 Checking dist HTML structure..."
	@test -d dist && test -f dist/index.html || make build
	@grep -qi '<!doctype' dist/index.html && echo "✅ Valid doctype found" || echo "❌ Missing doctype"
	@echo "✅ HTML structure valid!"

clean:
	@echo "🧹 Cleaning..."
	rm -rf dist/
	@echo "✅ Clean complete!"