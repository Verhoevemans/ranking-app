import * as mongoose from 'mongoose';
import { PlayerSchema } from './player.schema';

export const PlayerSetupSchema = new mongoose.Schema({
  players: [PlayerSchema]
});