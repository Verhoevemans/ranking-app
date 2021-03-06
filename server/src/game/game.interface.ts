import { Document } from 'mongoose';

export interface Game extends Document {
  id: number;
  creator: string;
}