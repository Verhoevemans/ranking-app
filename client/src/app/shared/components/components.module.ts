import { NgModule } from '@angular/core';
import { StepperComponent  } from './stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { StepComponent } from './stepper/step/step.component';
import { StepDirective } from './stepper/step/step.directive';

@NgModule({
  declarations: [
    StepComponent,
    StepDirective,
    StepperComponent
  ],
  exports: [
    CommonModule,
    StepperComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule {}
