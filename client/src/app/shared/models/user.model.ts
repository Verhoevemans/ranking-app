export enum UserRole {
  QUIZMASTER= 'quizmaster',
  PLAYER = 'player'
}

export class User {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
  participates: boolean;
}
