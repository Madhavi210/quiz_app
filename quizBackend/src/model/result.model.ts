import mongoose, { Document, Schema } from 'mongoose';
import { IResult } from '../interface/result.interface';

const ResultSchema: Schema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },

    exam: {
        type: mongoose.Types.ObjectId,
        ref: 'Exam',
        required: [true, 'Exam ID is required']
    },

    answers: [{
        _id: false,
        question: {
            type: mongoose.Types.ObjectId,
            ref: 'Question',
            required: [true, 'Question ID is required']
        },

        userAnswer: {
            type: String,
            required: [true, 'User answer is required']
        }
    }],

    score: {
        type: Number,
        required: [true, 'Score is required']
    },

    avgScore: {
        type: Number,
        default: 0.0
    }
},
{
    timestamps: true

});

export const Result = mongoose.model<IResult>('Result', ResultSchema);
