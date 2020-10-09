import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[stepPlaceholder]'
})
export class StepDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
