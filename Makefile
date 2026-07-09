.PHONY: build test test-units test-browser verify-build check-links dagger-test clean

build:
	@echo "🔨 Building Docondee site..."
	mkdir -p dist
	cp -r css dist/ 2>/dev/null || true
	cp -r assets dist/ 2>/dev/null || true
	cp js/*.js dist/ 2>/dev/null || true
	cp index.html dist/ 2>/dev/null || true
	@echo "✅ Build complete!"

test: test-units test-browser
	@echo "✅ All tests passed!"

test-units:
	@echo "🧪 Running unit tests..."
	npm run test:unit

test-browser:
	@echo "🌐 Running browser tests..."
	npm run test:browser

verify-build: build
	@echo "🔍 Verifying build output..."
	@test -d dist || (echo "❌ dist/ directory missing!" && exit 1)
	@test -f dist/index.html || (echo "❌ dist/index.html missing!" && exit 1)
	@echo "✅ Build verification passed!"

check-links:
	@echo "🔗 Checking for forbidden links..."
	@node scripts/check-forbidden-links.js

dagger-test: check-links
	@echo "🏗️ Running Dagger pipeline..."
	@which dagger >/dev/null || (echo "❌ Dagger not installed" && exit 1)
	@dagger run --project=. tsx dagger/pipeline.ts
	@echo "✅ Dagger pipeline complete!"

clean:
	@echo "🧹 Cleaning..."
	rm -rf dist/
	@echo "✅ Clean complete!"
