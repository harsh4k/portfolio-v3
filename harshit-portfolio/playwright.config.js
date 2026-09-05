import { defineConfig, devices } from "@playwright/test";

/**
 * The site is served exactly as in production: server.mjs over public/.
 * Nothing here mocks the intro — the point of these tests is that the real
 * WebGL handover works, because that is what has broken repeatedly.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: process.env.CI ? "list" : "line",
  use: {
    baseURL: "http://127.0.0.1:4175",
    trace: process.env.CI ? "retain-on-failure" : "off",
    // The intro registers a service worker that serves /_astro/ from cache.
    // Left on, tests would assert against a previous build's engine.
    serviceWorkers: "block",
  },
  projects: [
    {
      name: "desktop",
      testIgnore: /offline\.spec\.js/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      // The one project that lets the worker run, because the worker is what it
      // tests. Kept separate so the specs above keep asserting against the
      // build on disk rather than whatever a previous run left in a cache.
      name: "offline",
      testMatch: /offline\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        serviceWorkers: "allow",
      },
    },
    {
      // An iPhone-shaped Chromium rather than devices["iPhone 13"], which is
      // WebKit. What is under test is our layout and touch handover, not Safari,
      // and this keeps CI to a single browser download.
      name: "mobile",
      testIgnore: /offline\.spec\.js/,
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      },
    },
  ],
  webServer: [
    {
      command: "node server.mjs",
      url: "http://127.0.0.1:4175/",
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
    {
      // dist/ served the way Cloudflare Pages serves it, ".html" redirects and
      // all. One offline test uses it directly; see tests/pages-server.mjs for
      // why it has to exist.
      command: "node tests/pages-server.mjs",
      url: "http://127.0.0.1:4177/",
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
  ],
});
