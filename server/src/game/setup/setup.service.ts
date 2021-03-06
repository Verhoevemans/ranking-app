import { Injectable, Logger } from '@nestjs/common';

import { PlayerDto } from './dto/player.dto';
import { PlayerSetupDto } from './dto/player-setup.dto';
import { QuizmasterDto } from './dto/quizmaster.dto';
import { QuestionSetupDto } from './dto/question-setup.dto';

@Injectable()
export class SetupService {
  
  // TODO: this service should be responsible for communicating with the (mongoose) database
  
  private players: Set<PlayerDto>;
  private questions: Set<string>;
  private quizmaster: QuizmasterDto;
  private theme: string;
  private playerSetup: PlayerSetupDto;
  private questionSetup: QuestionSetupDto;
  
  addPLayers(playerSetup: PlayerSetupDto): void {
    Logger.log('SetupService: player setup should be saved to the database');
    this.players = new Set<PlayerDto>(playerSetup.players);
    this.quizmaster = playerSetup.quizmaster;
    this.playerSetup = { players: Array.from(this.players), quizmaster: this.quizmaster };
  }
  
  addQuestions(questionSetup: QuestionSetupDto): void {
    Logger.log('SetupService: player setup should be saved to the database');
    this.questions = new Set<string>(questionSetup.questions);
    this.theme = questionSetup.theme;
    this.questionSetup = { theme: this.theme, questions: Array.from(this.questions) };
  }
  
  getPlayers(): PlayerSetupDto {
    Logger.log('SetupService: player setup should be returned from the database');
    return this.playerSetup;
  }
  
  getQuestions(): QuestionSetupDto {
    Logger.log('SetupService: question setup should be returned from the database');
    return this.questionSetup;
  }
  
}