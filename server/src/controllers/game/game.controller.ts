import express from 'express';

class GameController {
  public async getGame(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
    return res.status(200).json({ message: `Starting game ${req.params.gameId}!` });
  }
  
  public async createGame(req: express.Request, res: express.Response): Promise<express.Response> {
    return res.status(200).json({ message: `New Game started successfully!` });
  }
}

export default new GameController();
