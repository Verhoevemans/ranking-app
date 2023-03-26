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
    this.gameService.createNewGame().subscribe((response) => {
      console.log('Created new game', response);
      this.router.navigate(['game', `${ response.data.id }`, 'setup']);
    });
  }

  goToExistingGame(gameId: string): void {
    this.gameService.getGame(gameId).subscribe((response) => {
      console.log('Retrieved existing game', response);
      this.router.navigate(['game', `${ gameId }`, 'setup']);
    });
  }
}
