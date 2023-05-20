import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GameService } from '../../shared/api/game/game.service';
import { Player } from '../../shared/models/player.model';

interface PlayersResponse {
  success: boolean,
  data: Player[]
}

@Injectable()
export class AddPlayersService {
  constructor (private httpClient: HttpClient,
               private gameService: GameService) {
  }

  getPlayers(): Observable<Player[]> {
    const gameId = this.gameService.getGameId();
    return this.httpClient
      .get<PlayersResponse>(`api/game/${gameId}/setup/players`)
      .pipe(
        map((response) => response.data)
      );
  }

  savePlayers(players: Player[]): Observable<Player[]> {
    const gameId = this.gameService.getGameId();

    return this.httpClient
      .post<PlayersResponse>(`api/game/${gameId}/setup/players`, { players })
      .pipe(
        map((response) => response.data)
      );
  }
}
