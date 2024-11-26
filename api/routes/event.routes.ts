import {Hono} from "hono";
import {eventService} from "../services/event.service";

export function registerEventRoutes(app: Hono) {
  app.get('/events', async (c) => {
    return c.json(await eventService.getAll(), 200);
  });

  app.get('/events/:id', async (c) => {
    const id = c.req.param('id');
    const event = await eventService.getById(id);
    if (!event) {
      return c.notFound();
    }
    return c.json(event, 200);
  });
}
