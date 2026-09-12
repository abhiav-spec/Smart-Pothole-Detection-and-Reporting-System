import "dotenv/config";
import { jest } from "@jest/globals";

// Set environment to test mode
process.env.NODE_ENV = "test";

// Silently suppress pino logs during test execution unless explicitly testing logs
process.env.LOG_LEVEL = "silent";

// Global timeout setup
jest.setTimeout(30000);
