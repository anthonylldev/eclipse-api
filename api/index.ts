import { Hono } from "hono";
import connectDB from "./config/database.config";
import { registerEventRoutes } from "./routes/event.routes";
import { registerDjRoutes } from "./routes/dj.routes";
import { registerAuthRoutes } from "./routes/auth.routes";
import jwtMiddleware from "./middleware/jwt.middleware";
import corsMiddleware from "./middleware/cors.middleware";
import loggerMiddleware from "./middleware/logger.middleware";
import type { JwtVariables } from 'hono/jwt';

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

// Register Middleware
const registerMiddleware = (app: Hono<{ Variables: Variables }>) => {
  app.use(loggerMiddleware);
  app.use(corsMiddleware);
  app.use("/api/*", jwtMiddleware);
};

// Register Routes
const registerRoutes = (app: Hono<{ Variables: Variables }>) => {
  registerAuthRoutes(app);
  registerEventRoutes(app);
  registerDjRoutes(app);
};

// Initialize Application
const initApp = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Register Middleware
    registerMiddleware(app);

    // Register Routes
    registerRoutes(app);

    // Serve
    Bun.serve({
      fetch: app.fetch,
      port: process.env.PORT ?? 3000,
    });
    console.log("Server started successfully!");

  } catch (error) {
    console.error("Failed to initialize application:", (error as Error).message);
    process.exit(1);
  }
};

initApp();
