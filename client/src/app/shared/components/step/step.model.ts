export type StepStatus = 'active' | 'inactive' | 'completed';

export interface StepComponentContent {
  active: boolean;
}

export class Step {
  
  constructor(public title: string,
              public status: StepStatus,
              public component: any,
              public isLast = false) {}
  
}
