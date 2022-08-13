import { EventEmitter } from '@angular/core';

export type StepStatus = 'active' | 'inactive' | 'completed';

export interface StepComponentContent {
  activeStep: boolean;
  setActiveStep: (active: boolean) => void;
  saveStepChanges?: () => void;
  contentChanged?: EventEmitter<string>;
}

export class Step {
  constructor(public title: string,
              public status: StepStatus,
              public component: any,
              public isLast = false,
              public isValid = false) {
  }
}
