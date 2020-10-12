import { Component, OnInit } from '@angular/core';
import { Step } from '../shared/components/step/step.model';
import { AddParticipantsComponent } from './add-participants/add-participants.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CompletedComponent } from './completed/completed.component';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  
  steps: Step[];

  constructor() { }

  ngOnInit(): void {
    this.steps = [
      new Step('Invite players', 'active', AddParticipantsComponent),
      new Step('Add Questions', 'inactive', AddQuestionsComponent),
      new Step('Game Configuration', 'inactive', ConfigurationComponent),
      new Step('Complete Setup', 'inactive', CompletedComponent, true)
    ];
  }

}
