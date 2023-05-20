import mongoose from 'mongoose';

export interface IQuestion {
    title: string;
    game: mongoose.Schema.Types.ObjectId;
}

const QuestionSchema = new mongoose.Schema<IQuestion>({
    title: {
        type: String,
        required: [true, 'Please add the Question title'],
        trim: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    }
}, {
    toJSON: { virtuals: true }
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
