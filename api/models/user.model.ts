import {CallbackError, Document, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
  username: string;
  name: string;
  email: string;
  password: string;

  comparePassword(candidatePassword: string): Promise<boolean>;

  changePassword(oldPassword: string, newPassword: string): Promise<boolean>;
}

const userSchema: Schema = new Schema({
  username: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

userSchema.pre<User>('save', async function (next: (err?: CallbackError) => void) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changePassword = async function (oldPassword: string, newPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(oldPassword, this.password);

  if (!isMatch) {
    throw new Error('Old password is incorrect');
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(newPassword, salt);
  await this.save();

  return true;
};

export const UserModel = model<User>('User', userSchema);
