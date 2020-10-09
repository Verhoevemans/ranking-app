import { NgModule } from '@angular/core';
import { StepperComponent  } from './stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { StepDirective } from './step/step.directive';

@NgModule({
  declarations: [
    StepComponent,
    StepDirective,
    StepperComponent
  ],
  exports: [
    CommonModule,
    StepComponent,
    StepperComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule {}
