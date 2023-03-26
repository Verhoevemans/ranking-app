import bodyParser from 'body-parser';
import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import connectDB from './utils/database';
import gameRouter from './routes/game/game.route';
import playRouter from './routes/play/play.route';
import rankRouter from './routes/rank/rank.route';
import setupRouter from './routes/setup/setup.route';
import * as process from 'process';

// Load env vars and enable colors
dotenv.config({ path: `${__dirname}/config/config.env` });
colors.enable();

// Connect to Database
connectDB();

const app = express();

app.use(bodyParser.json());

// Dev logging middleware Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

gameRouter.use('/:gameId/play', playRouter);
gameRouter.use('/:gameId/rank', rankRouter);
gameRouter.use('/:gameId/setup', setupRouter);
app.use('/api/game', gameRouter);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${ process.env.NODE_ENV } mode on port ${ PORT }`.yellow.bold);
});
