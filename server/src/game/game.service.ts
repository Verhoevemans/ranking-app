import { Injectable, Logger } from '@nestjs/common';
import { GameDto } from './game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './game.interface';

@Injectable()
export class GameService {
  
  // private readonly games: Game[] = [];
  
  constructor(@InjectModel('Game') private game: Model<Game>) {}
  
  /*add(game: GameDto): void {
    Logger.log(`Adding a game in the GameService: ${ game.id }`);
    //this.games.push(game);
  }*/
  
  async create(game: GameDto): Promise<GameDto> {
    const newGame = new this.game(game);
    return await newGame.save();
  }
  
  async find(gameId: number): Promise<GameDto> {
    return this.game.findOne({ id: gameId })
  }
  
  async findAll(): Promise<GameDto[]> {
    return this.game.find().exec();
  }
}