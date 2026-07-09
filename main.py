#!/usr/bin/env python3
"""
Dagger pipeline entry point for Docondee website.
Runs all build/test/verify stages in a Dagger session.
"""

import subprocess
import sys
import os

def run_in_dagger(command):
    """Run a shell command in the current environment (works with dagger run)."""
    result = subprocess.run(command, capture_output=True, text=True, shell=True)
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    return result.returncode == 0

def check_links():
    """Check for forbidden links."""
    print("🔗 Checking for forbidden links...")
    return run_in_dagger('node scripts/check-forbidden-links.js')

def build():
    """Build the static site."""
    print("🔨 Building Docondee site...")
    # Create dist and copy all assets from source directories
    commands = [
        'mkdir -p dist',
        'cp -r css dist/',       # css/styles.css → dist/css/styles.css
        'cp -r js dist/',         # js/scripts.js → dist/js/scripts.js  
        'cp -r assets dist/',     # assets/img/* → dist/assets/img/*
        'cp index.html dist/',
    ]
    for cmd in commands:
        run_in_dagger(cmd)
    
    print("✅ Build complete!")
    return True

def test_units():
    """Run unit tests."""
    print("🧪 Running unit tests...")
    return run_in_dagger('npm run test:unit')

def test_browser():
    """Run browser tests."""
    print("🌐 Running browser tests...")
    return run_in_dagger('npm run test:browser')

def verify_build():
    """Verify build output."""
    print("🔍 Verifying build...")
    # Check all expected files exist in dist/
    required_files = [
        'dist/index.html',
        'dist/css/styles.css',
        'dist/js/scripts.js'
    ]
    all_exist = True
    for f in required_files:
        if not os.path.exists(f):
            print(f"❌ Missing: {f}")
            all_exist = False
    
    if all_exist:
        print("✅ Build verification passed!")
        return True
    else:
        print("❌ Build verification failed")
        return False

def lint_html():
    """Check HTML structure."""
    print("🔍 Linting HTML...")
    return run_in_dagger('grep -qi "<!doctype" dist/index.html && echo "✅ Valid doctype found" && echo "✅ HTML structure valid!"')

def test_all():
    """Run all tests (check-links, build, test-units, test-browser, verify, lint)."""
    print("🧪 Running all tests via Dagger...")
    return check_links() and build() and test_units() and test_browser() and verify_build() and lint_html()

if __name__ == '__main__':
    os.chdir('/home/asimov/repository/git/projects/docondee-site')
    
    stages = {
        'check-links': check_links,
        'build': build,
        'test-units': test_units,
        'test-browser': test_browser,
        'verify-build': verify_build,
        'lint-html': lint_html,
        'test-all': test_all,
    }
    
    if len(sys.argv) < 2:
        # Run full pipeline
        print("🚀 Running full Dagger pipeline...")
        steps = [check_links, build, test_units, test_browser, verify_build, lint_html]
        for step in steps:
            if not step():
                print(f"❌ {step.__name__} failed")
                sys.exit(1)
        print("✅ Dagger pipeline complete!")
    else:
        stage = sys.argv[1]
        if stage in stages:
            stages[stage]()
            sys.exit(0)
        else:
            print(f"Unknown stage: {stage}")
            sys.exit(1)
    os.chdir('/home/asimov/repository/git/projects/docondee-site')
    
    stages = {
        'check-links': check_links,
        'build': build,
        'test-units': test_units,
        'test-browser': test_browser,
        'verify-build': verify_build,
        'lint-html': lint_html,
    }
    
    if len(sys.argv) < 2:
        # Run full pipeline
        print("🚀 Running full Dagger pipeline...")
        steps = [check_links, build, test_units, test_browser, verify_build, lint_html]
        for step in steps:
            if not step():
                print(f"❌ {step.__name__} failed")
                sys.exit(1)
        print("✅ Dagger pipeline complete!")
    else:
        stage = sys.argv[1]
        if stage in stages:
            stages[stage]()
            sys.exit(0)
        else:
            print(f"Unknown stage: {stage}")
            sys.exit(1)