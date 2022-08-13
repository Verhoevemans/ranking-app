import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GameService } from '../../shared/api/game/game.service';
import { Player } from '../../shared/models/player.model';

interface SavePlayersResponse {
  message: string
}

@Injectable()
export class AddPlayersService {

  private players: Player[];

  constructor (private httpClient: HttpClient,
               private gameService: GameService) {
  }

  getPlayersState(): Observable<Player[]> {
    if (this.players) {
      return of(this.players);
    } else {
      const gameId = this.gameService.getGameId();
      return this.httpClient
        .get<Player[]>(`api/game/${gameId}/setup/players`)
        .pipe(
          tap((players) => {
            this.players = players;
          })
        );
    }
  }

  savePlayersState(players: Player[]): Observable<SavePlayersResponse> {
    this.players = players;
    const gameId = this.gameService.getGameId();

    return this.httpClient.post<SavePlayersResponse>(`api/game/${gameId}/setup/players`, { players });
  }
}
