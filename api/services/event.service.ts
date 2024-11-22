import {Event} from '../models/event.model';
import {IEventService} from "../interfaces/event-service.interface";
import {IEventRepository} from "../interfaces/event-repository.interface";
import {eventRepository} from "../repositories/event.repository";

class EventService implements IEventService {

  private static instance: EventService;

  private constructor(private readonly eventRepository: IEventRepository) {
  }

  static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService(eventRepository);
    }
    return EventService.instance;
  }

  async getById(id: string): Promise<Event | null> {
    return this.eventRepository.findEventById(id);
  }

  async getAll(): Promise<Event[]> {
    return this.eventRepository.findAllEvents();
  }

  async create(event: Event): Promise<Event> {
    return this.eventRepository.saveEvent(event);
  }

  async update(id: string, event: Partial<Event>): Promise<Event | null> {
    return this.eventRepository.updateEvent(id, event);
  }

  async delete(id: string): Promise<boolean> {
    return this.eventRepository.deleteEvent(id);
  }
}

export const eventService: IEventService = EventService.getInstance();
