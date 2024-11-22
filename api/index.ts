import {Hono} from "hono";
import connectDB from "./config/database.config";
import {registerEventRoutes} from "./routes/event.routes";
import {registerDjRoutes} from "./routes/dj.routes";
import type {JwtVariables} from 'hono/jwt'
import jwtMiddleware from "./middleware/jwt.middleware";
import {registerAuthRoutes} from "./routes/auth.routes";

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

connectDB();

registerAuthRoutes(app);
app.use('/api/*', jwtMiddleware);
registerEventRoutes(app);
registerDjRoutes(app);

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT ?? 3000,
});
