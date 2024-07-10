import mongoose from 'mongoose';
import { IQuestion } from './question.interface';

export interface IExam extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    questions: {
        correctAnswer: string;
        userAnswer: string;
        question: IQuestion;
        difficulty: number;
        selectedAnswer?: string;
    }[];
    date: Date;
}
