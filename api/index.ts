import {Hono} from 'hono'
import {handle} from 'hono/vercel'
import connectToDatabase from "./config/mongo.config";
import {registerDjRoutes} from "./routes/dj.routes";

const app = new Hono().basePath('/api')

connectToDatabase();

app.get('/', (c) => {
  return c.json({message: "Congrats! You've deployed Hono to Vercel"})
})

registerDjRoutes(app);

const handler = handle(app);

export const GET: typeof handler = handler;
export const POST: typeof handler = handler;
