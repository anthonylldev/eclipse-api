import {Event} from "../models/event.model";

export interface IEventService {
  getById(id: string): Promise<Event | null>;

  getAll(): Promise<Event[]>;

  create(event: Event): Promise<Event>;

  update(id: string, event: Partial<Event>): Promise<Event | null>;

  delete(id: string): Promise<boolean>;
}
