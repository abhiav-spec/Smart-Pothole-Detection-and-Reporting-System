import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import notFoundHandler from "./middleware/notFound.middleware.js";
import globalErrorHandler from "./middleware/error.middleware.js";

const app = express();

// Security HTTP headers
app.use(helmet());

// Enable CORS with environment frontend URL
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true
  })
);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

// Handle Unhandled Routes (404)
app.use(notFoundHandler);

// Centralized Global Error Handler Middleware
app.use(globalErrorHandler);

export default app;
