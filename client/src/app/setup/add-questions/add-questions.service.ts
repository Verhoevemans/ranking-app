import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { GameService } from '../../shared/api/game/game.service';
import { Question } from '../../shared/models/question.model';

@Injectable()
export class AddQuestionsService {

  private questions: Question[];

  constructor (private httpClient: HttpClient,
               private gameService: GameService) {
  }

  getQuestions(): Observable<Question[]> {
    if (this.questions) {
      return of(this.questions);
    } else {
      const gameId = this.gameService.getGameId();
      return this.httpClient.get<Question[]>(`api/game/${gameId}/setup/questions`)
        .pipe(
          tap(questions => this.questions = questions)
        );
    }
  }

  saveQuestions(questions: Question[]): Observable<Question[]> {
    this.questions = questions;
    const gameId = this.gameService.getGameId();

    return this.httpClient.post<Question[]>(`api/game/${gameId}/setup/questions`, { questions });
  }
}
