import { Component, Input, OnInit } from '@angular/core';
import { StepComponentContent } from '../../shared/components/step/step.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, StepComponentContent {
  
  @Input() active: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
