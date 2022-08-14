import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { StepComponentContent } from '../../shared/components/stepper/step/step.model';
import { Question } from '../../shared/models/question.model';

import { AddQuestionsService } from './add-questions.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit, StepComponentContent {

  @Output() contentChanged = new EventEmitter<string>();

  activeStep: boolean;
  loading: boolean;
  questions: Question[];

  constructor(private addQuestionsService: AddQuestionsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.addQuestionsService.getQuestions().subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        this.loading = false;
      },
      (error) => {
        this.questions = [];
        this.loading = false;
      }
    );
  }

  saveStepChanges(): void {
    this.addQuestionsService.saveQuestions(this.questions).subscribe((response) => {
      console.log('New questions saved successfully:', response);
    })
  }

  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }

  onQuestionsChanged(event: { formStatus: string, questions?: Question[] }): void {
    if (event.formStatus === 'VALID' && event.questions) {
      this.questions = event.questions;
    }
    this.contentChanged.emit(event.formStatus);
  }
}
