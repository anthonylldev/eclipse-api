import {Event, EventModel} from '../models/event.model';
import {IRepository} from '../interfaces/repository.interface';

class EventRepository implements IRepository<Event> {
  async findById(id: string): Promise<Event | null> {
    return await EventModel.findById(id).populate('principalLineUp').populate('lineUp').exec();
  }

  async findAll(): Promise<Event[]> {
    return await EventModel.find().populate('principalLineUp').populate('lineUp').exec();
  }

  async create(event: Event): Promise<Event> {
    const newEvent = new EventModel(event);
    return await newEvent.save();
  }

  async update(id: string, event: Partial<Event>): Promise<Event | null> {
    return await EventModel.findByIdAndUpdate(id, event, {new: true}).populate('principalLineUp').populate('lineUp').exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await EventModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}

export const eventRepository: IRepository<Event> = new EventRepository();
