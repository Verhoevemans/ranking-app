import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';

import { GameDto } from './game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  
  constructor (private gameService: GameService) {}
  
  @Get('test')
  test(): string {
    Logger.log('test()');
    
    return 'endpoint to the game controller'
  }
  
  @Get('get/:id')
  getGame(@Param() params): Promise<GameDto> {
    Logger.log(`getGame() - ${ params.id }`);
    
    return this.gameService.find(params.id);
  }
  
  @Get('get-all')
  getGames(@Param() params): Promise<GameDto[]> {
    Logger.log(`getGames() - return all!!`);
    
    return this.gameService.findAll();
  }
  
  @Post('create')
  create(@Body() game: GameDto): Promise<GameDto> {
    Logger.log(`creating a new game for ${ game.creator }`);
    const newGame = new GameDto();
    newGame.id = Math.floor(Math.random() * (9000) + 1000);
    newGame.creator = game.creator;
    return this.gameService.create(newGame);
  }
}
