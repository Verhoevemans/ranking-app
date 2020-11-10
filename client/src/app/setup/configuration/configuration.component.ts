import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StepComponentContent } from '../../shared/components/stepper/step/step.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, StepComponentContent {

  @Output() validStep = new EventEmitter<boolean>();

  activeStep: boolean;
  configForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }

  setActiveStep(active: boolean): void {
    this.activeStep = active;
  }

  initializeForm(): void {
    this.configForm = new FormGroup({});
    this.configForm.statusChanges.subscribe((status) => {
      this.validStep.emit(status);
    })
  }

}
