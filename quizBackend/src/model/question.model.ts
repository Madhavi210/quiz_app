import mongoose, { Document, Schema } from "mongoose";
import { IQuestion } from "../interface/question.interface";

const QuestionSchema: Schema = new Schema({
  text: {
    type: String,
    required: [true, "Text is required"]
  },

  difficulty: {
    type: Number,
    required: [true, "Difficulty is required"],
    min: [1, "Difficulty must be at least 1"],
    max: [10, "Difficulty cannot exceed 10"]
  },

  options: {
    type: [String],
    required: [true, "Options are required"],
    validate: [(options: string[]) => options.length >= 2, "At least two options are required"]
  },

  correctAnswer: {
    type: String,
    required: [true, "Correct answer is required"]
  },
});

const Question = mongoose.model<IQuestion>("Question", QuestionSchema);
export default Question;
