import { Document } from 'mongoose';

export interface QuestionSetupInterface extends Document {
  theme: string;
  questions: string[];
}