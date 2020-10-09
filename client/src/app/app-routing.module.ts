import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayComponent } from './play/play.component';
import { RankComponent } from './rank/rank.component';
import { SetupComponent } from './setup/setup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', children: [
      { path: ':game-id/setup', component: SetupComponent },
      { path: ':game-id/rank', component: RankComponent },
      { path: ':game-id/play', component: PlayComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
