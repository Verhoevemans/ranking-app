import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../shared/api/game/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router, private gameService: GameService) {
  }

  goToNewGame(): void {
    const newGame = {
      creator: 'Jeroen2'
    };

    this.gameService.createNewGame(newGame).subscribe((game) => {
      this.router.navigate(['game', `${ game.id }`, 'setup']);
    });
  }

  goToExistingGame(gameId: string): void {
    this.gameService.getGame(gameId).subscribe((response) => {
      console.log('gotten game', response);
      this.router.navigate(['game', `${ gameId }`, 'setup']);
    });
  }
}
