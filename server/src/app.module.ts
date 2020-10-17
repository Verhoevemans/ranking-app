import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { SetupController } from './game/setup/setup.controller';
import { SetupService } from './game/setup/setup.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    GameController,
    SetupController
  ],
  providers: [
    AppService,
    GameService,
    SetupService
  ],
})
export class AppModule {}
