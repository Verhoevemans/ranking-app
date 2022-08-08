import express from 'express';

const game = {
  id: 123,
  users: [],
  questions: []
};

class GameController {
  public async getGame(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    return res.status(200).json(game);
  }
  
  public async createGame(req: express.Request, res: express.Response): Promise<express.Response> {
    return res.status(200).json(game);
  }
}

export default new GameController();
