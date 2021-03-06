import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { SetupController } from './setup/setup.controller';
import { GameService } from './game.service';
import { SetupService } from './setup/setup.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from './game.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])
  ],
  controllers: [
    GameController,
    SetupController
  ],
  providers: [
    GameService,
    SetupService
  ]
})
export class GameModule {}