.PHONY: build test test-units test-browser verify-build check-links dagger-test lint-html clean

# All commands go through Dagger CLI

build:
	@echo "🔨 Building Docondee site via Dagger..."
	@dagger run python3 main.py build
	@echo "✅ Build complete!"

test:
	@echo "🧪 Running all tests via Dagger..."
	@dagger run python3 main.py
	@echo "✅ All tests passed!"

test-units:
	@echo "🧪 Running unit tests via Dagger..."
	@dagger run python3 main.py test-units
	@echo "✅ Unit tests complete!"

test-browser:
	@echo "🌐 Running browser tests via Dagger..."
	@dagger run python3 main.py test-browser
	@echo "✅ Browser tests complete!"

check-links:
	@echo "🔗 Checking for forbidden links via Dagger..."
	@dagger run python3 main.py check-links
	@echo "✅ Link check complete!"

verify-build:
	@echo "🔍 Verifying build via Dagger..."
	@dagger run python3 main.py verify-build
	@echo "✅ Verification complete!"

lint-html:
	@echo "🔍 Linting HTML via Dagger..."
	@dagger run python3 main.py lint-html
	@echo "✅ Lint complete!"

dagger-test:
	@echo "🏗️ Running full Dagger pipeline..."
	@dagger run python3 main.py
	@echo "✅ Dagger pipeline complete!"

clean:
	@echo "🧹 Cleaning..."
	rm -rf dist/
	@echo "✅ Clean complete!"