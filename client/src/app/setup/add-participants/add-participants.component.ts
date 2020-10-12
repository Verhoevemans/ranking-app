import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { StepComponentContent } from '../../shared/components/step/step.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-participants',
  templateUrl: './add-participants.component.html',
  styleUrls: ['./add-participants.component.scss']
})
export class AddParticipantsComponent implements OnInit, StepComponentContent {
  
  @Output() validStep = new EventEmitter<boolean>();
  
  activeStep: boolean;
  participantsForm: FormArray;

  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }
  
  getParticipantFormGroup(name?, email?): FormGroup {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email])
    });
  }
  
  initializeForm(): void {
    this.participantsForm = new FormArray([]);
    this.participantsForm.push(this.getParticipantFormGroup());
    this.participantsForm.statusChanges.subscribe((status) => {
      this.validStep.emit(status);
    })
  }
  
  onAdd(): void {
    this.participantsForm.push(this.getParticipantFormGroup());
  }
  
  onDelete(index: number): void {
    this.participantsForm.removeAt(index);
    if (this.participantsForm.length === 0) {
      this.onAdd();
    }
  }

}
