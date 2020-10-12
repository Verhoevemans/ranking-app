import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Step, StepComponentContent } from './step.model';
import { StepDirective } from './step.directive';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, OnChanges {
  
  @Input() active: boolean;
  @Input() index: number;
  @Input() step: Step;
  
  @Output() onActivate = new EventEmitter<number>();
  @Output() onNext = new EventEmitter<number>();
  @Output() onPrevious = new EventEmitter<number>();
  
  @ViewChild(StepDirective, { static: true }) stepPlaceholder: StepDirective;
  
  stepComponent: StepComponentContent;
  valid: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadStep();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.active && !changes.active.firstChange) {
      this.stepComponent.setActiveStep(changes.active.currentValue);
    }
  }
  
  loadStep(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.step.component);
    const viewContainerRef = this.stepPlaceholder.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.stepComponent = (<StepComponentContent>componentRef.instance);
    if (this.stepComponent.validStep) {
      this.stepComponent.validStep.subscribe((valid) => {
        this.valid = valid === 'VALID';
      });
    }
    this.stepComponent.setActiveStep(this.active);
  }
  
  onNextClicked(): void {
    this.onNext.emit(this.index);
  }
  
  onPreviousClicked(): void {
    this.onPrevious.emit(this.index);
  }
  
  onStepClicked(): void {
    // TODO: this.valid is the state of the step which you are navigating to, not the one
    // you're currently on...
    if (this.valid) {
      this.onActivate.emit(this.index);
    }
  }

}
