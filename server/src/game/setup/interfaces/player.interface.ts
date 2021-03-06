import { Document } from 'mongoose';

export interface Player extends Document {
  email: string;
  name: string;
}