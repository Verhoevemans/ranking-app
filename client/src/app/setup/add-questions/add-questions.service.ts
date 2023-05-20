import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GameService } from '../../shared/api/game/game.service';
import { Question } from '../../shared/models/question.model';

interface QuestionsResponse {
  success: boolean,
  data: Question[]
}

@Injectable()
export class AddQuestionsService {
  constructor (private httpClient: HttpClient,
               private gameService: GameService) {
  }

  getQuestions(): Observable<Question[]> {
    const gameId = this.gameService.getGameId();
    return this.httpClient
      .get<QuestionsResponse>(`api/game/${gameId}/setup/questions`)
      .pipe(
        map(response => response.data)
      );
  }

  saveQuestions(questions: Question[]): Observable<Question[]> {
    const gameId = this.gameService.getGameId();

    return this.httpClient
      .post<QuestionsResponse>(`api/game/${gameId}/setup/questions`, { questions })
      .pipe(
        map(response => response.data)
      );
  }
}
