import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Question } from '../../../shared/models/question.model';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {

  @Input() questions: Question[];

  @Output() questionsChanged = new EventEmitter<{ formStatus: string, questions?: Question[] }>();

  questionsForm: FormGroup;

  get theme(): FormControl {
    return this.questionsForm.get('theme') as FormControl;
  }

  get questionsList(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.questionsForm = new FormGroup({
      theme: new FormControl('Family - All Ages', Validators.required),
      questions: new FormArray([])
    });

    if (this.questions.length > 0) {
      this.questions.forEach((question) => {
        this.questionsList.push(new FormControl(question.title, Validators.required));
      });
      this.questionsChanged.emit({ formStatus: this.questionsForm.status });
    } else {
      this.questionsList.push(new FormControl(null, Validators.required));
    }

    this.questionsForm.valueChanges.subscribe((value) => {
      const questions = [];
      value.questions.forEach((question) => {
        questions.push({ title: question });
      });
      this.questionsChanged.emit({ formStatus: this.questionsForm.status, questions });
    })
  }

  onAddQuestion(): void {
    this.questionsList.push(new FormControl(null, Validators.required))
  }

  onDeleteQuestion(index: number): void {
    this.questionsList.removeAt(index);
    if (this.questionsList.length === 0) {
      this.onAddQuestion();
    }
  }
}
