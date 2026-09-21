import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { generalRateLimiter } from "./middleware/rateLimit.middleware.js";
import { requestLoggerMiddleware } from "./middleware/requestLogger.middleware.js";
import notFoundHandler from "./middleware/notFound.middleware.js";
import globalErrorHandler from "./middleware/error.middleware.js";

const app = express();

// Request Tracing & Logging Middleware
app.use(requestLoggerMiddleware);

// Security HTTP headers
app.use(helmet());

// Enable CORS with environment frontend URL and common dev ports
app.use(
  cors({
    origin: [env.FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
    credentials: true
  })
);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint (Root & API)
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Pothole Backend Service is healthy",
    timestamp: new Date().toISOString()
  });
});

// General Rate Limiting for API routes
app.use("/api", generalRateLimiter);

// API Routes
app.use("/api", routes);

// Handle Unhandled Routes (404)
app.use(notFoundHandler);

// Centralized Global Error Handler Middleware
app.use(globalErrorHandler);

export default app;
