import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Player, PlayerRole } from '../../../shared/models/player.model';

@Component({
  selector: 'app-edit-add-players',
  templateUrl: './edit-add-players.component.html',
  styleUrls: ['./edit-add-players.component.scss']
})
export class EditAddPlayersComponent implements OnInit {

  @Input() players: Player[];

  @Output() playersChanged = new EventEmitter<{ formStatus: string, players?: Player[] }>();

  playersForm: FormGroup;

  get participants(): FormArray {
    return this.playersForm.get('participants') as FormArray;
  }

  get quizmaster(): FormGroup {
    return this.playersForm.get('quizmaster') as FormGroup;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  getParticipantFormGroup(player?: Player): FormGroup {
    return new FormGroup({
      id: new FormControl(player?.id),
      name: new FormControl(player?.name, Validators.required),
      email: new FormControl(player?.email, [Validators.required, Validators.email]),
      role: new FormControl(PlayerRole.PARTICIPANT),
      participates: new FormControl(true)
    });
  }

  initializeForm(): void {
    const quizmaster = this.players.find(player => player.role === PlayerRole.QUIZMASTER);
    const participants = this.players.filter(player => player.role === PlayerRole.PARTICIPANT);

    this.playersForm = new FormGroup({
      quizmaster: new FormGroup({
        id: new FormControl(quizmaster?.id),
        name: new FormControl(quizmaster?.name, Validators.required),
        email: new FormControl(quizmaster?.email, Validators.required),
        role: new FormControl(PlayerRole.QUIZMASTER),
        participates: new FormControl(quizmaster?.participates !== undefined ? quizmaster?.participates : true)
      }),
      participants: new FormArray([])
    });

    if (participants.length > 0) {
      participants.forEach((participant) => {
        this.participants.push(this.getParticipantFormGroup(participant));
      });
      this.playersChanged.emit({ formStatus: this.playersForm.status });
    } else {
      this.participants.push(this.getParticipantFormGroup());
    }

    this.playersForm.valueChanges.subscribe((value) => {
      const players = [];
      players.push(value.quizmaster);
      players.push(...value.participants);
      this.playersChanged.emit({ formStatus: this.playersForm.status, players });
    });
  }

  onAdd(): void {
    this.participants.push(this.getParticipantFormGroup());
  }

  onDelete(index: number): void {
    this.participants.removeAt(index);
    if (this.participants.length === 0) {
      this.onAdd();
    }
  }
}
