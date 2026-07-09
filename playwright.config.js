module.exports = {
  testDir: './tests/browser',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  reporter: [['list']],
  timeout: 30000
};
