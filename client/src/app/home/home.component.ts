import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../shared/api/game/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
  }
  
  onCreateGame(): void {
    console.log('onCreateGame()');
    
    const newGame = {
      creator: 'Jeroen2'
    };
    
    this.gameService.createNewGame(newGame).subscribe((game) => {
      console.log('game was created successfully! - ', game);
      this.router.navigate(['game', `${ game.id }`, 'setup']);
    });
  }
}
