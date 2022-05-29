import { Router } from 'express';

const router = Router();

router.route('/').get((req, res, next) => {
  res.status(200).send('Starting a new Game!');
});

router.route('/:gameId').get((req, res, next) => {
  res.status(200).send(`Starting Game ${req.params.gameId}!`);
});

//router.post('/create');

export default router;