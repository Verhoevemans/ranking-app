import express from 'express';
import bodyParser from 'body-parser';

import gameRouter from './routes/game/game.route';
import playRouter from './routes/play/play.route';
import rankRouter from './routes/rank/rank.route';
import setupRouter from './routes/setup/setup.route';

const app = express();

app.use(bodyParser.json());

gameRouter.use('/:gameId/play', playRouter);
gameRouter.use('/:gameId/rank', rankRouter);
gameRouter.use('/:gameId/setup', setupRouter);
app.use('/api/game', gameRouter);

app.listen(3000);
