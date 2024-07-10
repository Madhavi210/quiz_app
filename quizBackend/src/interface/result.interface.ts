
import mongoose from "mongoose";

export interface IResult extends Document {
    user: mongoose.Types.ObjectId;
    exam: mongoose.Types.ObjectId;
    answers: { question: mongoose.Types.ObjectId, userAnswer: string }[];
    score: number;
    avgScore:number;
}