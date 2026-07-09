#!/usr/bin/env node
const fs = require('fs');

// Check for forbidden links in href attributes only
const FORBIDDEN_URLS = [
  'youtube.com',
  'youtu.be', 
  'calendly.com',
  'book-call'
];

const INDEX_FILE = 'index.html';
const DIST_INDEX = 'dist/index.html';

const checkLinks = (file) => {
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, 'utf8').toLowerCase();
  
  const found = [];
  for (const url of FORBIDDEN_URLS) {
    // Only check in href, src, or action attributes (actual links)
    const regex = new RegExp(`(href|src|action)=["'][^"']*${url}`, 'gi');
    const matches = content.match(regex);
    if (matches) found.push(...matches);
  }
  return found;
};

const sourceIssues = checkLinks(INDEX_FILE);
const distIssues = checkLinks(DIST_INDEX);

if (sourceIssues.length > 0 || distIssues.length > 0) {
  console.log('❌ Forbidden links found:');
  if (sourceIssues.length > 0) console.log(`  ${INDEX_FILE}: ${sourceIssues.length} issues`);
  if (distIssues.length > 0) console.log(`  ${DIST_INDEX}: ${distIssues.length} issues`);
  process.exit(1);
}

console.log('✅ No forbidden links in href/src attributes');
process.exit(0);
