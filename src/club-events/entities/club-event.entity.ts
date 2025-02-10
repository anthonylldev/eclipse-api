import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ClubEvent {
  @Prop({ required: true, minlength: 3, maxlength: 100 })
  name: string;

  @Prop({ minlength: 10, maxlength: 500 })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ minlength: 5, maxlength: 2048 })
  ticketsUrl: string;

  @Prop({ minlength: 5, maxlength: 2048 })
  imageUrl: string;
}

export const ClubEventSchema = SchemaFactory.createForClass(ClubEvent);
