import {IService} from '../interfaces/service.interface';
import {Context} from 'hono';
import {Event} from '../models/event.model';
import {eventService} from "../services/event.service";

class EventController {
  constructor(private eventService: IService<Event>) {
  }

  async getAllEvents(c: Context) {
    const events = await this.eventService.getAll();
    return c.json(events);
  }

  async getEventById(c: Context) {
    const id = c.req.param('id');
    const event = await this.eventService.getById(id);
    if (!event) {
      return c.notFound();
    }
    return c.json(event);
  }

  async createEvent(c: Context) {
    const data = await c.req.json();
    const newEvent = await this.eventService.add(data);
    return c.json(newEvent, 201);
  }

  async updateEvent(c: Context) {
    const id = c.req.param('id');
    const data = await c.req.json();
    const updatedEvent = await this.eventService.update(id, data);
    if (!updatedEvent) {
      return c.notFound();
    }
    return c.json(updatedEvent);
  }

  async deleteEvent(c: Context) {
    const id = c.req.param('id');
    const result = await this.eventService.remove(id);
    if (!result) {
      return c.notFound();
    }
    return c.text('Event deleted', 204);
  }
}

export const eventController = new EventController(eventService);
