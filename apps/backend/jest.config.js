export default {
  testEnvironment: "node",
  transform: {},
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js",
    "!src/config/*.js"
  ],
  coverageDirectory: "coverage",
  clearMocks: true,
  testTimeout: 30000
};
