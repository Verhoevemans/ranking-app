import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Game } from '../../models/game.model';

@Injectable()
export class GameService {

  private gameId: string;

  constructor(private httpClient: HttpClient) {}

  createNewGame(): Observable<any> {
    console.log('createNewGame()');
    return this.httpClient.post<Game>(
      'api/game',
      {}
    ).pipe(
      tap((response) => {
        console.log('tap works');
        this.gameId = response.data.id;
      })
    );
  }

  getGame(id: string): Observable<Game> {
    return this.httpClient.get<Game>(`api/game/${ id }`);
  }

  getGameId(): string {
    console.log('getGameId()', this.gameId);
    return this.gameId;
  }

  setGameId(id: string): void {
    console.log('setGameId()', id);
    this.gameId = id;
  }
}
