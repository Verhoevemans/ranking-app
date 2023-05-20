import { NextFunction, Request, Response } from 'express';

import Player, { IPlayer } from '../../models/player.model';
import Question from '../../models/question.model';

class SetupController {
  /*
  * @description    Return all players for given Game ID
  * @route          GET api/game/{game-id}/setup/players
  */
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

  /*
  * @description    Update or create players for given Game ID
  * @route          POST api/game/{game-id}/setup/players
  */
  public async setPlayers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const playersFromDatabase = await Player.find({ game: req.params.gameId });
    const playersFromRequest = req.body.players;

    for (const existingPlayer of playersFromDatabase) {
      let targetPlayer;
      let targetIndex;
      playersFromRequest.some((player: IPlayer, index: number) => {
        if (player.id === existingPlayer.id) {
          targetPlayer = player;
          targetIndex = index;
          return true;
        }
      });

      if (targetPlayer) {
        // Player exists in DB and in Request: update
        await Player.findByIdAndUpdate(existingPlayer._id, targetPlayer);
        playersFromRequest.splice(targetIndex, 1);
      } else {
        // Player exists in DB but not in request: delete
        await Player.deleteOne({ _id: existingPlayer._id });
      }
    }

    for (const newPlayer of playersFromRequest) {
      // Player exists in request, but not in DB: create
      await Player.create({ game: req.params.gameId, ...newPlayer });
    }

    const players = await Player.find({ game: req.params.gameId });

    return res.status(200).json({
      success: true,
      data: players
    });
  }
  
  public async getQuestions(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const questions = await Question.find({ game: req.params.gameId });

    return res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  }
  
  public async setQuestions(req: Request, res: Response, next: NextFunction): Promise<Response> {
    return res.status(200).json({ message: 'Questions were set successfully!' });
  }
}

export default new SetupController();
