import { Component, Input } from '@angular/core';

import { Question } from '../../../shared/models/question.model';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent {
  @Input() questions: Question[];
}
