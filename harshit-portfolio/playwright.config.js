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
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "node server.mjs",
    url: "http://127.0.0.1:4175/",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
