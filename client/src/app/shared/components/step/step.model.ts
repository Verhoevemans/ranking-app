import { EventEmitter } from '@angular/core';

export type StepStatus = 'active' | 'inactive' | 'completed';

export interface StepComponentContent {
  activeStep: boolean;
  setActiveStep: (active: boolean) => void;
  validStep?: EventEmitter<boolean>;
}

export class Step {
  
  constructor(public title: string,
              public status: StepStatus,
              public component: any,
              public isLast = false) {}
  
}
