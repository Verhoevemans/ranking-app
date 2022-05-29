import { PlayerDto } from './player.dto';
import { QuizmasterDto } from './quizmaster.dto';

export class PlayerSetupDto {
  quizmaster: QuizmasterDto;
  players: PlayerDto[];
}