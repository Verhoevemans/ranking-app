import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { PlayerDto } from './dto/player.dto';
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
  getPlayers(): PlayerDto[] {
    return this.setupService.getPlayers();
  }
  
  @Post('players')
  setPlayers(@Body() players: PlayerDto[]): PlayerDto[] {
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
