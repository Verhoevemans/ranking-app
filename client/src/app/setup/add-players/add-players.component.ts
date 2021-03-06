import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { StepComponentContent } from '../../shared/components/stepper/step/step.model';
import { Player } from '../../shared/models/player.model';
import { Quizmaster } from '../../shared/models/quizmaster.model';

import { AddPlayersService, AddPlayersState } from './add-players.service';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.scss']
})
export class AddPlayersComponent implements OnInit, StepComponentContent {

  @Output() contentChanged = new EventEmitter<{ status: string, value: any }>();

  activeStep: boolean;
  loading: boolean;
  playersForm: FormGroup;

  constructor(private addPlayersService: AddPlayersService) { }

  get players(): FormArray {
    return this.playersForm.get('players') as FormArray;
  }

  get quizmaster(): FormGroup {
    return this.playersForm.get('quizmaster') as FormGroup;
  }

  ngOnInit(): void {
    this.loading = true;
    this.addPlayersService.getPlayersState()
      .subscribe((state: AddPlayersState) => {
        this.initializeForm(state?.quizmaster, state?.players);
        this.loading = false;
      }, (error) => {
        console.error(error);
        this.initializeForm();
        this.loading = false;
      });
  }

  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }

  saveStepChanges(): void {
    this.addPlayersService.savePlayersState(this.playersForm.value).subscribe((response) => {
      console.log('New players saved successfully:', response);
      // TODO: Stepper should show spinner on loading, only move to next step when save is successful
    });
  }

  getParticipantFormGroup(player?: Player): FormGroup {
    return new FormGroup({
      'name': new FormControl(player?.name, Validators.required),
      'email': new FormControl(player?.email, [Validators.required, Validators.email])
    });
  }

  initializeForm(quizmaster?: Quizmaster, players?: Player[]): void {
    this.playersForm = new FormGroup({
      quizmaster: new FormGroup({
        name: new FormControl(quizmaster?.name, Validators.required),
        email: new FormControl(quizmaster?.email, Validators.required),
        participates: new FormControl(quizmaster?.participates !== undefined ? quizmaster?.participates : true)
      }),
      players: new FormArray([])
    });

    if (players) {
      players.forEach((player) => {
        this.players.push(this.getParticipantFormGroup(player));
      });
      this.contentChanged.emit({ status: this.playersForm.status, value: this.playersForm.value });
    } else {
      this.players.push(this.getParticipantFormGroup());
    }

    this.playersForm.valueChanges.subscribe((value) => {
      this.contentChanged.emit({ status: this.playersForm.status, value });
    });
  }

  onAdd(): void {
    this.players.push(this.getParticipantFormGroup());
  }

  onDelete(index: number): void {
    this.players.removeAt(index);
    if (this.players.length === 0) {
      this.onAdd();
    }
  }

}
