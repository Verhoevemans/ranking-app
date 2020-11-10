import { EventEmitter } from '@angular/core';

export type StepStatus = 'active' | 'inactive' | 'completed';

export interface StepComponentContent {
  // TODO: check why active is stored on the component, and isLast and isValid are stored on the model..?
  activeStep: boolean;
  setActiveStep: (active: boolean) => void;
  saveStepChanges?: () => void;
  contentChanged?: EventEmitter<{ status: string, value: any }>;
}

export class Step {
  
  // TODO: check whether step actually needs to hold the data...?
  private stepData: any;
  
  constructor(public title: string,
              public status: StepStatus,
              public component: any,
              public isLast = false,
              public isValid = false) {
  }
  
  getStepData(): void {
    return this.stepData;
  }
  
  setStepData(data): void {
    this.stepData = data;
  }
}
