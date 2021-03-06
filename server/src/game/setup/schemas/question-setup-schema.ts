import * as mongoose from 'mongoose';

export const QuestionSetupSchema = new mongoose.Schema({
  theme: String,
  questions: [String]
});