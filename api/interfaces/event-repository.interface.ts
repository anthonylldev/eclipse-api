import {Event} from "../models/event.model";

export interface IEventRepository {
  findEventById(id: string): Promise<Event | null>;

  findAllEvents(): Promise<Event[]>;

  saveEvent(event: Event): Promise<Event>;

  updateEvent(id: string, event: Partial<Event>): Promise<Event | null>;

  deleteEvent(id: string): Promise<boolean>;
}
