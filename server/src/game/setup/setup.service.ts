import { Injectable, Logger } from '@nestjs/common';
import { PlayerDto } from './dto/player.dto';

@Injectable()
export class SetupService {
  
  // TODO: this service should be responsible for communicating with the (mongoose) database
  
  private players: Set<PlayerDto>;
  
  addPLayers(players: PlayerDto[]): void {
    Logger.log('SetupService: players should be saved to the database');
    this.players = new Set<PlayerDto>(players);
  }
  
  getPlayers(): PlayerDto[] {
    Logger.log('SetupService: players should be returned from the database');
    return Array.from(this.players);
  }
  
}