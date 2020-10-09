import { Component, Input, OnInit } from '@angular/core';
import { StepComponentContent } from '../../shared/components/step/step.model';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit, StepComponentContent {
  
  @Input() active: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
