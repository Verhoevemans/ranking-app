import { NextFunction, Request, Response } from 'express';

import Player, { IPlayer } from '../../models/player.model';
import Question, { IQuestion } from '../../models/question.model';

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
      // Player exists in request but not in DB: create
      await Player.create({ game: req.params.gameId, ...newPlayer });
    }

    const players = await Player.find({ game: req.params.gameId });

    return res.status(200).json({
      success: true,
      data: players
    });
  }

  /*
  * @description    Return all questions for given Game ID
  * @route          GET api/game/{game-id}/setup/questions
  */
  public async getQuestions(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const questions = await Question.find({ game: req.params.gameId });

    return res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  }

  /*
  * @description    Update or create questions for given Game ID
  * @route          POST api/game/{game-id}/setup/questions
  */
  public async setQuestions(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const questionsFromDatabase = await Question.find({ game: req.params.gameId });
    const questionsFromRequest = req.body.questions;

    for (const existingQuestion of questionsFromDatabase) {
      let targetQuestion;
      let targetIndex;
      questionsFromRequest.some((question: IQuestion, index: number) => {
        if (question.id === existingQuestion.id) {
          targetQuestion = question;
          targetIndex = index;
          return true;
        }
      });

      if (targetQuestion) {
        // Question exists in DB and in Request: update
        await Question.findByIdAndUpdate(existingQuestion._id, targetQuestion);
        questionsFromRequest.splice(targetIndex, 1);
      } else {
        // Question exists in DB but not in Request: delete
        await Question.deleteOne({ _id: existingQuestion._id });
      }
    }

    for (const newQuestion of questionsFromRequest) {
      // Question exists in request but not in DB: create
      await Question.create({ game: req.params.gameId, ...newQuestion });
    }

    const questions = await Question.find({ game: req.params.gameId });

    return res.status(200).json({
      success: true,
      data: questions
    });
  }
}

export default new SetupController();
