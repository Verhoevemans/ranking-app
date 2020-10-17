import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { StepComponentContent } from '../../shared/components/step/step.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SetupService } from '../../shared/api/setup/setup.service';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.scss']
})
export class AddPlayersComponent implements OnInit, StepComponentContent {
  
  @Output() contentChanged = new EventEmitter<{ status: string, value: any }>();
  
  activeStep: boolean;
  playersForm: FormArray;

  constructor(private setupService: SetupService) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }
  
  saveStepChanges(): void {
    const players = this.playersForm.value;
    this.setupService.savePlayers(players).subscribe((response) => {
      console.log('New players save successfully:', response);
      // TODO: Stepper should show spinner on loading, only move to next step when save is successful
    });
  };
  
  getParticipantFormGroup(name?, email?): FormGroup {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email])
    });
  }
  
  initializeForm(): void {
    this.playersForm = new FormArray([]);
    this.playersForm.push(this.getParticipantFormGroup());
    this.playersForm.valueChanges.subscribe((value) => {
      this.contentChanged.emit({ status: this.playersForm.status, value })
    });
  }
  
  onAdd(): void {
    this.playersForm.push(this.getParticipantFormGroup());
  }
  
  onDelete(index: number): void {
    this.playersForm.removeAt(index);
    if (this.playersForm.length === 0) {
      this.onAdd();
    }
  }

}
