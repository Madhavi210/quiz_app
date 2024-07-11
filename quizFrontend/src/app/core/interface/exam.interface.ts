import { IQuestion } from "./question.interface";

export interface IExam  {
    user: string;
    questions: {
        correctAnswer: string;
        userAnswer: string;
        question: IQuestion;
        difficulty: number;
        selectedAnswer?: string;
    }[];
    date: Date;
}
