import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Game } from '../../models/game.model';

@Injectable()
export class GameService {
  
  private gameId: number;
  
  constructor(private httpClient: HttpClient) {}
  
  createNewGame(game): Observable<Game> {
    return this.httpClient.post<Game>(
      'api/game/create',
      game
    ).pipe(
      tap((game) => {
        this.gameId = game.id;
      })
    );
  }
  
  getGame(id: number): Observable<Game> {
    return this.httpClient.get<Game>(`api/game/get/${ id }`);
  }
  
  getGameId(): number {
    return this.gameId;
  }
  
  setGameId(id: number): void {
    console.log('setGameId()', id);
    this.gameId = id;
  }
}
