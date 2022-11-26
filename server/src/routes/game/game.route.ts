import { Router } from 'express';

import GameController from '../../controllers/game/game.controller';

const router = Router();

/*router.route('/').get((req, res, next) => {
  res.status(200).send('Starting a new Game!');
});*/

// TODO: this should be /game/:gameId
router.route('/:gameId').get(GameController.getGame);

// TODO: this should be /game, and then there could be an error for GET /game, since you cannot GET a game without an ID..?
router.route('/create').post(GameController.createGame);

// TODO: if these endpoints all get /game as a prefix, then the other routes should have the same prefix /game/12/setup/questions etc...

export default router;
