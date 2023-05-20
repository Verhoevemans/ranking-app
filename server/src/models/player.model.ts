import mongoose, { ObjectId } from 'mongoose';

export interface IPlayer {
    _id: ObjectId;
    id: string;
    name: string;
    email: string;
    role: 'quizmaster' | 'participant';
    game: ObjectId;
}

const PlayerSchema = new mongoose.Schema<IPlayer>({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxLength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['quizmaster', 'participant'],
        default: 'participant'
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    }
}, {
    toJSON: { virtuals: true }
});

export default mongoose.model<IPlayer>('Player', PlayerSchema);
