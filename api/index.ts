import {Hono} from 'hono'
import {handle} from 'hono/vercel'

const app = new Hono().basePath('/api')

app.get('/', (c) => {
    return c.json({message: "Congrats! You've deployed Hono to Vercel"})
})

const handler = handle(app);

export const GET: typeof handler = handler;
export const POST: typeof handler = handler;
