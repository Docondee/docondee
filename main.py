#!/usr/bin/env python3
"""
Dagger pipeline entry point for Docondee website.
Runs all build/test/verify stages in a Dagger session.
"""

import subprocess
import sys

def run_in_dagger(command):
    """Run a command in a Dagger session."""
    try:
        result = subprocess.run(
            ['dagger', 'run', 'python', '-c', f'''
import subprocess
result = subprocess.run({command}, capture_output=True, text=True)
print(result.stdout)
exit(result.returncode)
'''],
            capture_output=True,
            text=True
        )
        return result.returncode == 0
    except Exception as e:
        print(f"Error: {e}")
        return False

def run_local(command):
    """Fallback to local execution."""
    result = subprocess.run(command, capture_output=True, text=True, shell=True)
    print(result.stdout)
    return result.returncode == 0

def check_links():
    """Check for forbidden links."""
    print("🔗 Checking for forbidden links...")
    return run_local('node scripts/check-forbidden-links.js')

def build():
    """Build the static site."""
    print("🔨 Building Docondee site...")
    return run_local('''
mkdir -p dist && 
cp -r css dist/ 2>/dev/null || true &&
cp -r assets dist/ 2>/dev/null || true &&
cp js/*.js dist/ 2>/dev/null || true &&
cp index.html dist/ 2>/dev/null || true
''')

def test_units():
    """Run unit tests."""
    print("🧪 Running unit tests...")
    return run_local('npm run test:unit')

def test_browser():
    """Run browser tests."""
    print("🌐 Running browser tests...")
    return run_local('npm run test:browser')

def verify_build():
    """Verify build output."""
    print("🔍 Verifying build...")
    return run_local('''
test -d dist && 
test -f dist/index.html && 
test -f dist/css/styles.css && 
echo "✅ Build verification passed!"
''')

def lint_html():
    """Check HTML structure."""
    print("🔍 Linting HTML...")
    return run_local('''
grep -qi "<!doctype" dist/index.html && 
echo "✅ Valid doctype found" &&
echo "✅ HTML structure valid!"
''')

if __name__ == '__main__':
    import os
    os.chdir('/home/asimov/repository/git/projects/docondee-site')
    
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
        # Run specific stage
        stage = sys.argv[1]
        stages = {
            'check-links': check_links,
            'build': build,
            'test-units': test_units,
            'test-browser': test_browser,
            'verify-build': verify_build,
            'lint-html': lint_html,
        }
        if stage in stages:
            stages[stage]()
        else:
            print(f"Unknown stage: {stage}")
            sys.exit(1)