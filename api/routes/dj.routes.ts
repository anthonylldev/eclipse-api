import {Hono} from "hono";
import {JwtVariables} from "hono/jwt";
import {djService} from "../services/dj.service";

export function registerDjRoutes(app: Hono<{ Variables: JwtVariables }>) {

  app.post('/api/djs', async (c) => {
    return c.json(await djService.create(await c.req.json()), 201);
  });

  app.get('/djs', async (c) => {
    return c.json(await djService.getAll(), 200);
  });

  app.get('/djs/:id', async (c) => {
    const id = c.req.param('id');
    const dj = await djService.getById(id);
    if (!dj) {
      return c.notFound();
    }
    return c.json(dj, 200);
  });

  app.put('/api/djs/:id', async (c) => {
    const id = c.req.param('id');
    const djData = await c.req.json();

    if (!djData) {
      return c.json({message: 'No data provided'}, 400);
    }

    const updatedDj = await djService.update(id, djData);

    if (!updatedDj) {
      return c.notFound();
    }
    return c.json(updatedDj);
  });

  app.delete('/api/djs/:id', async (c) => {
    const id = c.req.param('id');
    const dj = await djService.delete(id);
    if (!dj) {
      return c.notFound();
    }
    return c.json({}, 204);
  });
}
