import {eventRepository} from "../repositories/event.repository";
import {Event} from '../models/event.model';
import {IRepository} from "../interfaces/repository.interface";
import {IService} from "../interfaces/service.interface";

class EventService implements IService<Event> {
  constructor(private eventRepository: IRepository<Event>) {
  }

  async getById(id: string): Promise<Event | null> {
    return await this.eventRepository.findById(id);
  }

  async getAll(): Promise<Event[]> {
    return await this.eventRepository.findAll();
  }

  async add(event: Event): Promise<Event> {
    return await this.eventRepository.create(event);
  }

  async update(id: string, event: Partial<Event>): Promise<Event | null> {
    return await this.eventRepository.update(id, event);
  }

  async remove(id: string): Promise<boolean> {
    return await this.eventRepository.delete(id);
  }
}

export const eventService: IService<Event> = new EventService(eventRepository);
