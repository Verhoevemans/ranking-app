import { Component, Input, OnInit } from '@angular/core';

import { Player, PlayerRole } from '../../../shared/models/player.model';

@Component({
  selector: 'app-view-add-players',
  templateUrl: './view-add-players.component.html',
  styleUrls: ['./view-add-players.component.scss']
})
export class ViewAddPlayersComponent implements OnInit {

  @Input() players: Player[];

  participants: Player[];
  quizmaster: Player;

  ngOnInit(): void {
    this.participants = this.players.filter(player => player.role === PlayerRole.PARTICIPANT);
    this.quizmaster = this.players.find(player => player.role === PlayerRole.QUIZMASTER);
  }
}
