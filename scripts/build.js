#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Build script for static site
const dist = 'dist';
if (!fs.existsSync(dist)) fs.mkdirSync(dist);

// Copy assets
const copy = (src, dest) => {
  if (fs.existsSync(src)) {
    const destPath = path.join(dist, dest);
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.cpSync(src, destPath, { recursive: true });
  }
};

copy('css', 'css');
copy('js', 'js');
copy('assets', 'assets');
fs.copyFileSync('index.html', path.join(dist, 'index.html'));
console.log('Build complete');
