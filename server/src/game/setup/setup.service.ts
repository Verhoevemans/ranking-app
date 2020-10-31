import { Injectable, Logger } from '@nestjs/common';

import { PlayerDto } from './dto/player.dto';
import { PlayerSetupDto } from './dto/player-setup.dto';
import { QuizmasterDto } from './dto/quizmaster.dto';

@Injectable()
export class SetupService {
  
  // TODO: this service should be responsible for communicating with the (mongoose) database
  
  private players: Set<PlayerDto>;
  private quizmaster: QuizmasterDto;
  private playerSetup: PlayerSetupDto;
  
  addPLayers(playerSetup: PlayerSetupDto): void {
    Logger.log('SetupService: player setup should be saved to the database');
    this.players = new Set<PlayerDto>(playerSetup.players);
    this.quizmaster = playerSetup.quizmaster;
    this.playerSetup = { players: Array.from(this.players), quizmaster: this.quizmaster };
  }
  
  getPlayers(): PlayerSetupDto {
    Logger.log('SetupService: player setup should be returned from the database');
    return this.playerSetup;
  }
  
}