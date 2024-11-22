import {Event, EventModel} from '../models/event.model';
import {IEventRepository} from "../interfaces/event-repository.interface";

const POPULATE_FIELDS = ['principalLineUp', 'lineUp'];

class EventRepository implements IEventRepository {

  private static instance: EventRepository;

  private constructor() {
  }

  static getInstance(): EventRepository {
    if (!EventRepository.instance) {
      EventRepository.instance = new EventRepository();
    }
    return EventRepository.instance;
  }

  private populateFields(query: any) {
    return POPULATE_FIELDS.reduce((q, field) => q.populate(field), query);
  }

  async findEventById(id: string): Promise<Event | null> {
    return this.populateFields(EventModel.findById(id)).exec();
  }

  async findAllEvents(): Promise<Event[]> {
    return this.populateFields(EventModel.find()).exec();
  }

  async saveEvent(event: Event): Promise<Event> {
    const newEvent = new EventModel(event);
    return newEvent.save();
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event | null> {
    return this.populateFields(EventModel.findByIdAndUpdate(id, event, {new: true})).exec();
  }

  async deleteEvent(id: string): Promise<boolean> {
    const result = EventModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}

export const eventRepository: IEventRepository = EventRepository.getInstance();
