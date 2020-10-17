import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GameService } from '../game/game.service';
import { Player } from '../../models/player.model';

@Injectable()
export class SetupService {
  
  constructor(private httpClient: HttpClient,
              private gameService: GameService) {}
  
  savePlayers(players: Player[]): Observable<Player[]> {
    const gameId = this.gameService.getGameId();
    return this.httpClient.post<any>(`api/game/${gameId}/setup/players`, players);
  }
  
  saveQuestions(questions: any): Observable<any> {
    // TODO: create questions model
    const gameId = this.gameService.getGameId();
    return this.httpClient.post<any>(`api/game/${gameId}/setup/questions`, questions);
  }
}
