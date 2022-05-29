import { Document } from 'mongoose';
import { Quizmaster } from './quizmaster.interface';
import { Player } from './player.interface';

export interface PlayerSetup extends Document {
  quizmaster: Quizmaster;
  players: Player[];
}