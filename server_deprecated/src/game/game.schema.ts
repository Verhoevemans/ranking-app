import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
  id: Number,
  creator: String,
  updatedAt: { type: Date, default: Date.now }
});