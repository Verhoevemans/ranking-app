import { Component, Input } from '@angular/core';
import { Step } from './step/step.model';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {

  @Input() steps: Step[];

  activeStepIndex = 0;

  goToNextStep(currentActiveStep: number): void {
    console.log('goToNextStep()', this.steps[this.activeStepIndex].getStepData());
    this.steps[currentActiveStep].status = 'completed';
    this.steps[currentActiveStep + 1].status = 'active';
    this.activeStepIndex = currentActiveStep + 1;
  }

  goToPreviousStep(currentActiveStep: number): void {
    this.steps[currentActiveStep].status = 'inactive';
    this.steps[currentActiveStep - 1].status = 'active';
    this.activeStepIndex = currentActiveStep - 1;
  }

  goToStep(targetStep: number): void {
    this.steps.forEach((step, index) => {
      if (index > targetStep) {
        step.status = 'inactive';
      }
    });
    this.steps[this.activeStepIndex].status = 'inactive';
    this.steps[targetStep].status = 'active';
    this.activeStepIndex = targetStep;
  }

}
