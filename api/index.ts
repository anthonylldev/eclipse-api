import {Hono} from "hono";
import connectDB from "./config/database";
import {eventRoutes} from "./routes/event.routes";
import {djRoutes} from "./routes/dj.routes";

const app = new Hono();

connectDB();

app.route('/', eventRoutes);
app.route('/', djRoutes);

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 3000,
});
