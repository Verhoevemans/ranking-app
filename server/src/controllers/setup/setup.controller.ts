import express, { NextFunction, Request, Response } from 'express';

import Game from '../../models/game.model';
import Player from '../../models/player.model';
import { Error, Schema, Types } from 'mongoose';

type RequestParams = { gameId: string };

type Question = {
  title: string
};

type PlayerRequestBody = {
  players: any
};

class SetupController {
  public async getPlayers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let players;

    if (req.params.gameId) {
      players = await Player.find({ game: req.params.gameId });
    } else {
      players = await Player.find();
    }

    return res.status(200).json({
      success: true,
      count: players.length,
      data: players
    });
  }

  public async setPlayers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    //req.body.game = req.params.gameId;
    //console.log(req.body.gameId);
    console.log(req.body);

    console.log(`setPlayers() - game-id: ${req.params.gameId} players: ${req.body}`);

    req.body.players.forEach((player: any) => {
      player.game = req.params.gameId;
      //await Player.updateOne({ id: player.id }, player);
    })

    console.log(req.body);

    await Player.deleteMany({ game: req.params.gameId });
    const players = await Player.insertMany(req.body.players);

    console.log('Players created successfully', players);

    return res.status(200).json({
      success: true,
      data: players
    });
  }
  
  public async getQuestions(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const params = req.params as RequestParams;
    return res.status(200).json([]);
  }
  
  public async setQuestions(req: Request, res: Response, next: NextFunction): Promise<Response> {
    //game.questions = req.body.questions;
    return res.status(200).json({ message: 'Questions were set successfully!' });
  }
}

export default new SetupController();
