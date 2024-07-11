import { IfAny } from "mongoose";
import { IQuestion } from "../interface/question.interface";
import QuestionModel from "../model/question.model";

class QuestionServices {
  createQuestion = async (questionData: IQuestion): Promise<IQuestion> => {
    const newQuestion = new QuestionModel(questionData);
    return await newQuestion.save();
  };

  getAllQuestions = async (): Promise<{ questions: IQuestion[], totalQuestion: number }> => {
    const totalQuestion = await QuestionModel.countDocuments();
    const questions = await QuestionModel.find();
    return { totalQuestion, questions };
  };

  getQuestionById = async (id: string): Promise<IQuestion | null> => {
    return await QuestionModel.findById(id);
  };

  updateQuestion = async (
    id: string,
    questionData: Partial<IQuestion>
  ): Promise<IQuestion | null> => {
    return await QuestionModel.findByIdAndUpdate(id, questionData, {
      new: true,
      runValidators: true,
    });
  };

  deleteQuestion = async (id: string): Promise<IQuestion | null> => {
    return await QuestionModel.findByIdAndDelete(id);
  };
}

export default new QuestionServices();
