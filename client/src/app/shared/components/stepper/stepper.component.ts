import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../step/step.model';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  
  @Input() steps: Step[];
  
  activeStepIndex = 0;
  
  ngOnInit(): void {
    console.log('stepper created:', this.steps);
  }
  
  goToNextStep(currentActiveStep: number): void {
    console.log('goToNextStep()');
    this.steps[currentActiveStep].status = 'completed';
    this.steps[currentActiveStep + 1].status = 'active';
    this.activeStepIndex = currentActiveStep + 1;
  }
  
  goToPreviousStep(currentActiveStep: number): void {
    this.steps[currentActiveStep].status = 'completed';
    this.steps[currentActiveStep - 1].status = 'active';
    this.activeStepIndex = currentActiveStep - 1;
  }
  
  goToStep(targetStep: number): void {
    this.steps[this.activeStepIndex].status = 'completed';
    this.steps[targetStep].status = 'active';
    this.activeStepIndex = targetStep;
  }
  
}
