import { Router } from 'express';

import GameController from '../../controllers/game/game.controller';

const router = Router();

/*router.route('/').get((req, res, next) => {
  res.status(200).send('Starting a new Game!');
});*/

router.route('/:gameId').get(GameController.getGame);

router.route('/create').post(GameController.createGame);

export default router;
