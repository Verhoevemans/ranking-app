import { Router } from 'express';

type RequestParams = { gameId: string };

const router = Router({ mergeParams: true });

router.route('/').get((req, res, next) => {
  res.status(200).send('This is the setup!');
});

router.route('/players').get((req, res, next) => {
  const params = req.params as RequestParams;
  res.status(200).send(`Here are the players for game ${params.gameId}!`);
});

router.route('/questions').get((req, res, next) => {
  const params = req.params as RequestParams;
  res.status(200).send(`Here are the questions for game ${params}!`);
});

//router.get('/players');

export default router;
