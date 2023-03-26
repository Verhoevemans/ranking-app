import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { GameService } from '../../shared/api/game/game.service';
import { Player } from '../../shared/models/player.model';

interface GetPlayersResponse {
  success: boolean,
  data: Player[]
}

interface SavePlayersResponse {
  message: string
}

@Injectable()
export class AddPlayersService {

  private players: Player[];

  constructor (private httpClient: HttpClient,
               private gameService: GameService) {
  }

  getPlayers(): Observable<Player[]> {
    if (this.players) {
      return of(this.players);
    } else {
      console.log('getPlayers() - using the API');
      const gameId = this.gameService.getGameId();
      return this.httpClient
        .get<GetPlayersResponse>(`api/game/${gameId}/setup/players`)
        .pipe(
          map((response) => response.data),
          tap((players) => {
            this.players = players;
          })
        );
    }
  }

  savePlayers(players: Player[]): Observable<SavePlayersResponse> {
    this.players = players;
    const gameId = this.gameService.getGameId();

    return this.httpClient.post<SavePlayersResponse>(`api/game/${gameId}/setup/players`, { players });
  }
}
