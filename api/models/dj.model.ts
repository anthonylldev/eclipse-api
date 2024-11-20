import {Schema, Document, model} from 'mongoose';
import {SocialMediaPlatform} from "./social-media-platform.enum";

export interface Dj extends Document {
  name: string;
  imageUrl: string;
  socialMedia: { platform: SocialMediaPlatform, url: string }[];
  biography?: string;
}

const djSchema = new Schema<Dj>({
  name: {type: String, required: true},
  imageUrl: {type: String, required: true},
  biography: {type: String, maxlength: 1500},
  socialMedia: [
    {
      platform: {type: String, enum: Object.values(SocialMediaPlatform)},
      url: {type: String}
    }
  ],
});

export const DjModel = model<Dj>('Dj', djSchema);
