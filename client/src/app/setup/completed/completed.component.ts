import { Component, OnInit, } from '@angular/core';

import { StepComponentContent } from '../../shared/components/stepper/step/step.model';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit, StepComponentContent {

  activeStep: boolean;

  constructor() {}

  ngOnInit(): void {
  }

  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }
}
