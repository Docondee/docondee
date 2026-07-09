.PHONY: build test test-units test-browser verify-build check-links dagger-test lint-html clean

# All commands go through main.py (Dagger pipeline) except clean

build:
	@echo "🔨 Building via main.py..."
	@python3 main.py build
	@echo "✅ Build complete!"

test:
	@echo "🧪 Running full test via main.py..."
	@python3 main.py
	@echo "✅ All tests passed!"

test-units:
	@echo "🧪 Running unit tests via main.py..."
	@python3 main.py test-units
	@echo "✅ Unit tests complete!"

test-browser:
	@echo "🌐 Running browser tests via main.py..."
	@python3 main.py test-browser
	@echo "✅ Browser tests complete!"

check-links:
	@echo "🔗 Checking for forbidden links via main.py..."
	@python3 main.py check-links
	@echo "✅ Link check complete!"

verify-build:
	@echo "🔍 Verifying build via main.py..."
	@python3 main.py verify-build
	@echo "✅ Verification complete!"

lint-html:
	@echo "🔍 Linting HTML via main.py..."
	@python3 main.py lint-html
	@echo "✅ Lint complete!"

dagger-test: check-links build test-units test-browser
	@echo "✅ All Dagger pipeline stages complete!"

clean:
	@echo "🧹 Cleaning..."
	rm -rf dist/
	@echo "✅ Clean complete!"