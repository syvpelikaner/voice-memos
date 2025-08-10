import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage",
      thresholds: { lines: 0, functions: 0, branches: 0, statements: 0 },
      exclude: ["**/vite.config.*", "**/vitest.config.*"],
    },
  },
});
