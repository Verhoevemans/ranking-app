import { Injectable, Logger } from '@nestjs/common';
import { Game } from './game.model';

@Injectable()
export class GameService {
  private readonly games: Game[] = [];
  
  add(game: Game): void {
    Logger.log(`Adding a game in the GameService: ${ game.id }`);
    this.games.push(game);
  }
  
  find(gameId: number): Game {
    return this.games.find((game) => {
      return game.id === gameId;
    });
  }
}