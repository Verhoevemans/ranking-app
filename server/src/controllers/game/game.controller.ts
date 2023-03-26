import { NextFunction, Request, Response } from 'express';

import Game from '../../models/game.model';
import { Error } from 'mongoose';

class GameController {
  // @desc      Get all Games
  // @route     GET /api/game
  // @access    Public
  public async getGames(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const games = await Game.find();
    
    return res.status(200).json({
      success: true,
      count: games.length,
      data: games
    });
  }
  
  // @desc      Create a new Game
  // @route     POST /api/game
  // @access    Public
  public async createGame(req: Request, res: Response): Promise<Response> {
    const game = await Game.create({ title: 'First Game!' });

    return res.status(200).json({
      success: true,
      data: game
    });
  }

  // @desc      Get a single Game
  // @route     GET /api/game/:gameId
  // @access    Public
  public async getGame(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let game;
    try {
      game = await Game.findById(req.params.gameId);
    } catch (error) {
      return res.status(400).send(`Game ID ${req.params.gameId} is not a valid ID.`);
    }

    if (!game) {
      return res.status(404).send(`Game with ID ${req.params.gameId} was not found.`);
    } else {
      return res.status(200).json({
        success: true,
        data: game
      });
    }
  }

  // @desc      Update a Game
  // @route     PUT /api/game/:gameId
  // @access    Public
  public async updateGame(req: Request, res: Response): Promise<Response> {
    const game = await Game.findById(req.params.gameId);

    return res.status(200).json({
      success: true,
      data: game
    });
  }

  // @desc      Delete a Game
  // @route     DELETE /api/game/:gameId
  // @access    Public
  public async deleteGame(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const game = await Game.findById(req.params.gameId);

    if (!game) {
      return res.status(404).send(`Game with ID ${req.params.gameId} was not found.`);
    } else {
      await game.remove();

      return res.status(200).json({
        success: true,
        data: game
      });
    }
  }
}

export default new GameController();
