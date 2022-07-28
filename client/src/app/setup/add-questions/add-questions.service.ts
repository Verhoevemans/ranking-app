import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GameService } from '../../shared/api/game/game.service';

export interface AddQuestionsState {
  theme: string,
  questions: string[];
}

@Injectable()
export class AddQuestionsService {

  private addQuestionsState: AddQuestionsState;

  constructor (private httpClient: HttpClient,
               private gameService: GameService) {
  }

  getQuestionsState(): Observable<AddQuestionsState> {
    if (this.addQuestionsState) {
      return of(this.addQuestionsState);
    } else {
      const gameId = this.gameService.getGameId();
      return this.httpClient.get<AddQuestionsState>(`api/game/${gameId}/setup/questions`);
    }
  }

  saveQuestionsState(state: AddQuestionsState): Observable<AddQuestionsState> {
    this.addQuestionsState = state;
    const gameId = this.gameService.getGameId();
    return this.httpClient.post<any>(`api/game/${gameId}/setup/questions`, state);
  }
}
