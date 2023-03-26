import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
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

export default mongoose.model('Game', GameSchema);
