import { Player } from './player.model';

export interface Game {
  id: number;
  questions: {}[];
  players: Player[];
}
