import { Component, Input, OnInit } from '@angular/core';
import { StepComponentContent } from '../../shared/components/step/step.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit, StepComponentContent {
  
  @Input() active: boolean;
  
  questionsForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    this.questionsForm = new FormGroup({})
  }

}
