import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

import { PlayerSetupDto } from './dto/player-setup.dto';
import { SetupService } from './setup.service';

// TODO: use NestJs Router:
// https://github.com/nestjsx/nest-router

@Controller('game/:id/setup')
export class SetupController {
  
  constructor (private setupService: SetupService) {}
  
  @Get('test')
  test(): string {
    Logger.log('test()');
    return 'endpoint to the game/setup controller'
  }
  
  @Get('players')
  getPlayers(): PlayerSetupDto {
    return this.setupService.getPlayers();
  }
  
  @Post('players')
  setPlayers(@Body() players: PlayerSetupDto): PlayerSetupDto {
    this.setupService.addPLayers(players);
    return this.setupService.getPlayers();
  }
  
  @Post('questions')
  setQuestions(@Body() questions: any[]): any[] {
    Logger.log('SetupController setQuestions()');
    // TODO: implement connection to service
    return ['great', 'success'];
  }
  
}
