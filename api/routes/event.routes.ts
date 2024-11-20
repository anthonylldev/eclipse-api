import {Hono} from 'hono';
import {eventController} from '../controllers/event.controller';

const eventRoutes = new Hono();

eventRoutes.post('/events', (c) => eventController.createEvent(c));
eventRoutes.get('/events', (c) => eventController.getAllEvents(c));
eventRoutes.get('/events/:id', (c) => eventController.getEventById(c));
eventRoutes.put('/events/:id', (c) => eventController.updateEvent(c));
eventRoutes.delete('/events/:id', (c) => eventController.deleteEvent(c));

export {eventRoutes};
