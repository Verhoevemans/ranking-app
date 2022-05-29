import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ranking'),
    GameModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ]
})
export class AppModule {}
