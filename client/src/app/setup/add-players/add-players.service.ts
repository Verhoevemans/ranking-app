import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { GameService } from '../../shared/api/game/game.service';
import { User, UserRole } from '../../shared/models/user.model';

export interface AddPlayersState {
  quizmaster: User,
  players: User[]
}

interface SavePlayersResponse {
  message: string
}

@Injectable()
export class AddPlayersService {

  private addPlayersState: AddPlayersState;

  constructor (private httpClient: HttpClient,
               private gameService: GameService) {
  }

  getPlayersState(): Observable<AddPlayersState> {
    if (this.addPlayersState) {
      return of(this.addPlayersState);
    } else {
      const gameId = this.gameService.getGameId();
      return this.httpClient
        .get<User[]>(`api/game/${gameId}/setup/players`)
        .pipe(
          map((users) => this.mapUsersToState(users)),
          tap((addPlayersState) => {
            this.addPlayersState = addPlayersState;
          })
        );
    }
  }

  savePlayersState(state: AddPlayersState): Observable<SavePlayersResponse> {
    this.addPlayersState = state;
    const gameId = this.gameService.getGameId();
    const users = this.mapStateToUsers(state);

    return this.httpClient.post<SavePlayersResponse>(`api/game/${gameId}/setup/players`, { users });
  }

  private mapStateToUsers(state: AddPlayersState): User[] {
    const users = [];
    users.push(state.quizmaster);
    users.push(...state.players);

    return users;
  }

  private mapUsersToState(users: User[]): AddPlayersState {
    const quizmaster = users.find(user => user.role === UserRole.QUIZMASTER);
    const players = users.filter(user => user.role === UserRole.PLAYER);

    return { quizmaster, players };
  }
}
