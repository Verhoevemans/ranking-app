import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { RankComponent } from './rank/rank.component';
import { GameService } from './shared/api/game/game.service';
import { ComponentsModule } from './shared/components/components.module';
import { SetupComponent } from './setup/setup.component';
import { AddParticipantsComponent } from './setup/add-participants/add-participants.component';
import { AddQuestionsComponent } from './setup/add-questions/add-questions.component';
import { ConfigurationComponent } from './setup/configuration/configuration.component';
import { CompletedComponent } from './setup/completed/completed.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    RankComponent,
    PlayComponent,
    HomeComponent,
    AddParticipantsComponent,
    AddQuestionsComponent,
    ConfigurationComponent,
    CompletedComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
