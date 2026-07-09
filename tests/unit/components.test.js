/**
 * Unit tests for Docondee website
 */

const fs = require('fs');
const path = require('path');

describe('Docondee HTML Tests', () => {
  const indexHtml = path.resolve(process.cwd(), 'index.html');
  let content;

  beforeAll(() => {
    content = fs.readFileSync(indexHtml, 'utf8').toLowerCase();
  });

  test('index.html should exist', () => {
    expect(fs.existsSync(indexHtml)).toBe(true);
  });

  test('index.html should have valid doctype', () => {
    expect(content.startsWith('<!doctype html>')).toBe(true);
  });

  test('index.html should have meta charset', () => {
    expect(content).toContain('charset');
  });

  test('index.html should have meta viewport', () => {
    expect(content).toContain('viewport');
  });

  test('index.html should have title', () => {
    expect(content).toContain('<title>');
  });

  test('index.html should have header element', () => {
    expect(content).toContain('<header');
  });

  test('index.html should have nav element', () => {
    expect(content).toContain('<nav');
  });

  test('index.html should have footer element', () => {
    expect(content).toContain('<footer');
  });

  test('index.html should have body element', () => {
    expect(content).toContain('<body');
  });
});
