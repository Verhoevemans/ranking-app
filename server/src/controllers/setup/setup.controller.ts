import express from 'express';

type RequestParams = { gameId: string };

const game = {
  id: 123,
  users: new Array<User>(),
  questions: new Array<Question>()
};

type User = {
  email: string,
  name: string,
  role: 'player' | 'quizmaster',
  participates: boolean
};

type Question = {
  title: string
};

type PlayerRequestBody = {
  users: User[]
};

class SetupController {
  public async getPlayers(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    console.log('getPlayers()', game);
    return res.status(200).json(game.users);
  }
  
  public async setPlayers(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    const body = req.body as PlayerRequestBody;
    console.log('setPlayers', body);
    game.users = body.users;
    return res.status(200).json({ message: 'Players were set successfully!' });
  }
  
  public async getQuestions(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    const params = req.params as RequestParams;
    return res.status(200).json(game.questions);
  }
  
  public async setQuestions(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    game.questions = req.body.questions;
    return res.status(200).json({ message: 'Questions were set successfully!' });
  }
}

export default new SetupController();
