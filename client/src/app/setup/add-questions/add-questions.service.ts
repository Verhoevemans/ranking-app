import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { GameService } from '../../shared/api/game/game.service';
import { Question } from '../../shared/models/question.model';

export interface AddQuestionsState {
  // TODO: theme should not be part of this state...
  theme: string,
  questions: Question[];
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
      return this.httpClient.get<Question[]>(`api/game/${gameId}/setup/questions`)
        .pipe(
          map(questions => {
            return { questions, theme: 'Family - All Ages' };
          }),
          tap(questionsState => this.addQuestionsState = questionsState)
        );
    }
  }

  saveQuestionsState(state: AddQuestionsState): Observable<Question[]> {
    this.addQuestionsState = state;
    const gameId = this.gameService.getGameId();
    const questions = state.questions.map(question => {
      return { title: question };
    });
    return this.httpClient.post<Question[]>(`api/game/${gameId}/setup/questions`, { questions });
  }
}
