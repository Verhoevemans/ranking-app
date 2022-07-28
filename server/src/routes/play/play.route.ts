import { Router } from 'express';

type RequestParams = { gameId: string };

const router = Router({ mergeParams: true });

router.route('/').get((req, res, next) => {
  const params = req.params as RequestParams;
  res.status(200).send(`This is where you play in game ${params.gameId}!`);
});

export default router;
