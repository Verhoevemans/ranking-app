import { Document } from 'mongoose';

export interface Quizmaster extends Document {
  email: string;
  name: string;
  participates: boolean;
}