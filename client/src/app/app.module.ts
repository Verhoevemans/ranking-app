import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { RankComponent } from './rank/rank.component';
import { GameService } from './shared/api/game/game.service';
import { ComponentsModule } from './shared/components/components.module';
import { SetupComponent } from './setup/setup.component';
import { AddPlayersComponent } from './setup/add-players/add-players.component';
import { AddQuestionsComponent } from './setup/add-questions/add-questions.component';
import { ConfigurationComponent } from './setup/configuration/configuration.component';
import { CompletedComponent } from './setup/completed/completed.component';
import { SetupService } from './shared/api/setup/setup.service';
import { AddPlayersService } from './setup/add-players/add-players.service';
import { AddQuestionsService } from './setup/add-questions/add-questions.service';

@NgModule({
  declarations: [
    AppComponent,
    AddPlayersComponent,
    AddQuestionsComponent,
    CompletedComponent,
    ConfigurationComponent,
    HomeComponent,
    PlayComponent,
    RankComponent,
    SetupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    NgbTooltipModule,
    ReactiveFormsModule
  ],
  providers: [
    AddPlayersService,
    AddQuestionsService,
    GameService,
    SetupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
