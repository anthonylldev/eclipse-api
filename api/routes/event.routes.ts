import {Hono} from 'hono';
import {JwtVariables} from "hono/jwt";
import {eventService} from "../services/event.service";

export function registerEventRoutes(app: Hono<{ Variables: JwtVariables }>) {
  app.post('/api/events', async (c) => {
    return c.json(eventService.create(await c.req.json()), 201);
  });

  app.get('/events', (c) => {
    return c.json(eventService.getAll(), 200);
  });

  app.get('/events/:id', async (c) => {
    const id = c.req.param('id');
    const event = await eventService.getById(id);
    if (!event) {
      return c.notFound();
    }
    return c.json(event, 200);
  });

  app.put('/api/events/:id', async (c) => {
    const id = c.req.param('id');
    const eventData = await c.req.json();

    if (!eventData) {
      return c.json({message: 'No data provided'}, 400);
    }

    const updatedEvent = await eventService.update(id, eventData);
    if (!updatedEvent) {
      return c.notFound();
    }
    return c.json(updatedEvent);
  });

  app.delete('/api/events/:id', async (c) => {
    const id = c.req.param('id');
    const event = await eventService.delete(id);
    if (!event) {
      return c.notFound();
    }
    return c.json({}, 204);
  });
}
