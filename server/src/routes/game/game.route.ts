import { Router } from 'express';

import GameController from '../../controllers/game/game.controller';

const router = Router();

router.route('/')
  .get(GameController.getGames)
  .post(GameController.createGame);

router.route('/:gameId')
  .get(GameController.getGame)
  .put(GameController.updateGame)
  .delete(GameController.deleteGame);

export default router;
