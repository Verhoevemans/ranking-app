import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

import { PlayerSetupDto } from './dto/player-setup.dto';
import { SetupService } from './setup.service';
import { QuestionSetupDto } from './dto/question-setup.dto';

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
  
  @Get('questions')
  getQuestions(): QuestionSetupDto {
    return this.setupService.getQuestions();
  }
  
  @Post('questions')
  setQuestions(@Body() questions: QuestionSetupDto): QuestionSetupDto {
    this.setupService.addQuestions(questions);
    return this.setupService.getQuestions();
  }
  
}
