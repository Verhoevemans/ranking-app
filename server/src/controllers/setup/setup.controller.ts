import express from 'express';

type RequestParams = { gameId: string };

const game = [{
  id: 123,
  players: new Array<User>()
}];

type User = {
  email: string,
  name: string,
  role: 'player' | 'quizmaster',
  participates: boolean
};

type PlayerRequestBody = {
  users: User[]
};

class SetupController {
  public async getPlayers(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    console.log('getPlayers()', game);
    return res.status(200).json(game[0].players);
  }
  
  public async setPlayers(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    const body = req.body as PlayerRequestBody;
    console.log('setPlayers', body);
    game[0].players = body.users;
    return res.status(200).json({ message: 'Players were set successfully!' });
  }
  
  public async getQuestions(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    const params = req.params as RequestParams;
    return res.status(200).json({ message: `Here are the questions for game ${params.gameId}!` });
  }
  
  public async setQuestions(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    // TODO
  }
}

export default new SetupController();
