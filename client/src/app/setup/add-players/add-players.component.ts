import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { StepComponentContent } from '../../shared/components/stepper/step/step.model';
import { Player } from '../../shared/models/player.model';

import { AddPlayersService } from './add-players.service';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.scss']
})
export class AddPlayersComponent implements OnInit, StepComponentContent {

  @Output() contentChanged = new EventEmitter<string>();

  activeStep: boolean;
  loading: boolean;
  players: Player[];

  constructor(private addPlayersService: AddPlayersService) {}

  ngOnInit(): void {
    this.loading = true;
    this.addPlayersService.getPlayers().subscribe(
      (players) => {
        this.players = players || [];
        this.loading = false;
      }, (error) => {
        console.error(error);
        this.players = [];
        this.loading = false;
      });
  }

  saveStepChanges(): void {
    this.addPlayersService.savePlayers(this.players)
      .subscribe((players) => {
        this.players = players;
        // TODO: Stepper should show spinner on loading, only move to next step when save is successful
      });
  }

  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }

  onPlayersChanged(event: { formStatus: string, players?: Player[] }): void {
    if (event.formStatus === 'VALID' && event.players) {
      this.players = event.players;
    }
    this.contentChanged.emit(event.formStatus);
  }
}
