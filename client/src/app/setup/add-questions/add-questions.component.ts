import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StepComponentContent } from '../../shared/components/step/step.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit, StepComponentContent {
  
  @Output() validStep = new EventEmitter<boolean>();
  
  activeStep: boolean;
  questionsForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }
  
  initializeForm(): void {
    this.questionsForm = new FormGroup({
      'theme': new FormControl(null, Validators.required),
      'question': new FormControl(null, Validators.required)
    });
    this.questionsForm.statusChanges.subscribe((status) => {
      this.validStep.emit(status);
    })
  }

}
