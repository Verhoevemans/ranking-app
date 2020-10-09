import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';

import { Game } from './game.model';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  
  constructor (private gameService: GameService) {}
  
  @Get('test')
  test(): string {
    Logger.log('test()');
    
    return 'this endpoint seems to be working!'
  }
  
  @Get('get/:id')
  getGame(@Param() params): Game {
    Logger.log(`getGame() - ${ params.id }`);
    
    return this.gameService.find(params.id);
  }
  
  @Post('create')
  create(@Body() game: Game): Game {
    Logger.log(`creating a new game for ${ game.creator }`);
    const newGame = new Game();
    newGame.id = Math.floor(Math.random() * 1000);
    newGame.creator = game.creator;
    this.gameService.add(newGame);
    
    return newGame;
  }
}
