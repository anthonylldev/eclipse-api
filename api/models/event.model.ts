import {Schema, Document, model} from 'mongoose';
import {Dj} from './dj.model';

export interface Event extends Document {
  title: string;
  description: string;
  flyer: string;
  date: Date;
  principalLineUp: Dj[];
  lineUp: Dj[];
}

const eventSchema = new Schema<Event>({
  title: {type: String, required: true},
  description: {type: String, required: false},
  flyer: {type: String, required: true},
  date: {type: Date, required: true},
  principalLineUp: [{type: Schema.Types.ObjectId, ref: 'Dj', required: false}],
  lineUp: [{type: Schema.Types.ObjectId, ref: 'Dj', required: false}],
});

export const EventModel = model<Event>('Event', eventSchema);
