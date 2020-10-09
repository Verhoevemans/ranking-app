import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Game } from '../../models/game.model';

@Injectable()
export class GameService {
  
  constructor(private httpClient: HttpClient) {}
  
  createNewGame(game): Observable<Game> {
    return this.httpClient.post<Game>(
      'api/game/create',
      game
    );
  }
  
  getGame(id: number): Observable<Game> {
    return this.httpClient.get<Game>(`api/game/get/${ id }`);
  }
}
