import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Step, StepStatus } from './step.model';
import { StepDirective } from './step.directive';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  
  @Input() index: number;
  @Input() config: Step;
  
  @Output() onNext = new EventEmitter<number>();
  @Output() onPrevious = new EventEmitter<number>();
  @Output() onActivate = new EventEmitter<number>();
  
  @ViewChild(StepDirective, { static: true }) stepPlaceholder: StepDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadStep();
  }
  
  loadStep(): void {
    console.log('loadStep()');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.config.component);
    const viewContainerRef = this.stepPlaceholder.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
  
  onNextClicked(): void {
    this.onNext.emit(this.index);
  }
  
  onPreviousClicked(): void {
    this.onPrevious.emit(this.index);
  }
  
  onStepClicked(): void {
    this.onActivate.emit(this.index);
  }

}
