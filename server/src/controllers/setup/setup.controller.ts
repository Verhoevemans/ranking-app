import express from 'express';

type RequestParams = { gameId: string };

const game = {
  id: 123,
  players: [
    { id: null, name: 'Jeroen', email: 'jeroen@gmail.com', role: 'quizmaster', participates: true },
    { id: null, name: 'Miranda', email: 'miranda@hotmail.com', role: 'participant', participates: true },
    { id: null, name: 'Wouter', email: 'wouter@outlook.com', role: 'participant', participates: true },
    { id: null, name: 'Peter', email: 'peter@yahoo.com', role: 'participant', participates: true }
  ],
  questions: new Array<Question>()
};

type Player = {
  id: null,
  email: string,
  name: string,
  role: 'participant' | 'quizmaster',
  participates: boolean
};

type Question = {
  title: string
};

type PlayerRequestBody = {
  players: Player[]
};

class SetupController {
  public async getPlayers(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    console.log('getPlayers()', game);
    return res.status(200).json(game.players);
  }
  
  public async setPlayers(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    const body = req.body as PlayerRequestBody;
    console.log('setPlayers', body);
    game.players = body.players;
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
