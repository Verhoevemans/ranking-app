import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { StepComponentContent } from '../../shared/components/stepper/step/step.model';
import { Question } from '../../shared/models/question.model';

import { AddQuestionsService, AddQuestionsState } from './add-questions.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit, StepComponentContent {

  @Output() contentChanged = new EventEmitter<{ status: string, value: any }>();

  activeStep: boolean;
  loading: boolean;
  questionsForm: FormGroup;

  constructor(private addQuestionsService: AddQuestionsService) {}

  get theme(): FormControl {
    return this.questionsForm.get('theme') as FormControl;
  }

  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  ngOnInit(): void {
    this.loading = true;
    this.addQuestionsService.getQuestionsState().subscribe(
      (state: AddQuestionsState) => {
        this.initializeForm(state?.theme, state?.questions);
        this.loading = false;
      },
      (error) => {
        this.initializeForm();
        this.loading = false;
      }
    );

    this.initializeForm();
  }

  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }

  saveStepChanges() {
    this.addQuestionsService.saveQuestionsState(this.questionsForm.value).subscribe((response) => {
      console.log('New questions saved successfully:', response);
    })
  }

  initializeForm(theme?: string, questions?: Question[]): void {
    this.questionsForm = new FormGroup({
      theme: new FormControl(theme, Validators.required),
      questions: new FormArray([])
    });

    if (questions && questions.length > 0) {
      questions.forEach((question) => {
        this.questions.push(new FormControl(question.title, Validators.required));
      });
      this.contentChanged.emit({ status: this.questionsForm.status, value: this.questionsForm.value });
    } else {
      this.questions.push(new FormControl(null, Validators.required));
    }

    this.questionsForm.valueChanges.subscribe((value) => {
      this.contentChanged.emit({ status: this.questionsForm.status, value });
    })
  }

  onAddQuestion(): void {
    this.questions.push(new FormControl(null, Validators.required))
  }

  onDeleteQuestion(index: number): void {
    this.questions.removeAt(index);
    if (this.questions.length === 0) {
      this.onAddQuestion();
    }
  }
}
