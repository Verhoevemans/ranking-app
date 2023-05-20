import mongoose from 'mongoose';

import { IPlayer } from './player.model';
import { IQuestion } from './question.model';

export interface IGame {
    title: string;
    players: IPlayer[];
    questions: IQuestion[];
}

const GameSchema = new mongoose.Schema<IGame>({
    title: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

GameSchema.virtual('players', {
    ref: 'Player',
    localField: '_id',
    foreignField: 'game',
    justOne: false
});

GameSchema.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'game',
    justOne: false
});

export default mongoose.model<IGame>('Game', GameSchema);
