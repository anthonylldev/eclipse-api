import {Hono} from 'hono';
import {djController} from "../controllers/dj.controller";

const djRoutes = new Hono();

djRoutes.post('/djs', (c) => djController.createDj(c));
djRoutes.get('/djs', (c) => djController.getAllDjs(c));
djRoutes.get('/djs/:id', (c) => djController.getDjById(c));
djRoutes.put('/djs/:id', (c) => djController.updateDj(c));
djRoutes.delete('/djs/:id', (c) => djController.deleteDj(c));


export {djRoutes};
