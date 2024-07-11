

export interface IResult  {
    user: string;
    exam: string;
    answers: { question: string, userAnswer: string }[];
    score: number;
    avgScore:number;
}