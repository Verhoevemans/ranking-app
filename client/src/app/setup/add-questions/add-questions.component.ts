import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StepComponentContent } from '../../shared/components/stepper/step/step.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SetupService } from '../../shared/api/setup/setup.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit, StepComponentContent {

  @Output() contentChanged = new EventEmitter<{ status: string, value: any }>();

  activeStep: boolean;
  questionsForm: FormGroup;

  constructor(private setupService: SetupService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }

  saveStepChanges() {
    const questions = this.questionsForm.value;
    this.setupService.saveQuestions(questions).subscribe((response) => {
      console.log('New questions save successfully:', response);
    })
  }

  initializeForm(): void {
    this.questionsForm = new FormGroup({
      theme: new FormControl(null, Validators.required),
      // TODO: questions is an array
      question: new FormControl(null, Validators.required)
    });
    this.questionsForm.valueChanges.subscribe((value) => {
      this.contentChanged.emit({ status: this.questionsForm.status, value });
    })
  }

}
