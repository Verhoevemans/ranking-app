export enum PlayerRole {
  QUIZMASTER= 'quizmaster',
  PARTICIPANT = 'participant'
}

export class Player {
  id?: number;
  name: string;
  email: string;
  role: PlayerRole;
  participates: boolean;
}
