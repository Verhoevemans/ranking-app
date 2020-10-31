import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GameService } from '../../shared/api/game/game.service';
import { Player } from '../../shared/models/player.model';
import { Quizmaster } from '../../shared/models/quizmaster.model';

export interface AddPlayersState {
  quizmaster: Quizmaster,
  players: Player[];
}

@Injectable()
export class AddPlayersService {
  
  private addPlayersState: AddPlayersState;
  
  constructor (private httpClient: HttpClient,
               private gameService: GameService) {}
  
  getPlayersState(): Observable<AddPlayersState> {
    if (this.addPlayersState) {
      return of(this.addPlayersState);
    } else {
      const gameId = this.gameService.getGameId();
      return this.httpClient.get<any>(`api/game/${gameId}/setup/players`);
    }
  }
  
  savePlayersState(state: AddPlayersState): Observable<AddPlayersState> {
    this.addPlayersState = state;
    const gameId = this.gameService.getGameId();
    return this.httpClient.post<any>(`api/game/${gameId}/setup/players`, state);
  }
}
