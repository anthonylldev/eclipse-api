import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class User {
  _id: ObjectId;

  @Prop({ required: true, maxlength: 50 })
  name: string;

  @Prop({ required: true, unique: true, maxlength: 20 })
  username: string;

  @Prop({ required: true, minlength: 8 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
