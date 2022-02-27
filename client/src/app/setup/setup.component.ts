import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '../shared/api/game/game.service';
import { Step } from '../shared/components/stepper/step/step.model';

import { AddPlayersComponent } from './add-players/add-players.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { CompletedComponent } from './completed/completed.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  steps: Step[];

  constructor(private gameService: GameService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (!this.gameService.getGameId()) {
      const gameId = this.route.snapshot.paramMap.get('game-id');
      this.gameService.setGameId(+gameId);
    }

    // TODO: consider whether I want to store the 'active' status in localStorage, so on reload you stay at the current active step
    this.steps = [
      new Step('Invite players', 'active', AddPlayersComponent),
      new Step('Add Questions', 'inactive', AddQuestionsComponent),
      new Step('Game Configuration', 'inactive', ConfigurationComponent),
      new Step('Complete Setup', 'inactive', CompletedComponent, true, true)
    ];
  }
}
