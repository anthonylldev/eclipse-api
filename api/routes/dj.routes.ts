import {Hono} from "hono";
import {djService} from "../services/dj.service";

export function registerDjRoutes(app: Hono) {
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
}
