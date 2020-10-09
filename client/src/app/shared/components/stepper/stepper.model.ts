import { Step } from '../step/step.model';

export class Stepper {
  
  private activeStepIndex = 0;
  
  constructor(public steps: Step[]) {}
  
  goToNextStep(currentActiveStep: number): void {
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
