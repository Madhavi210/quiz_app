import { Request, Response, NextFunction } from "express";
import QuestionServices from "../service/question.service";

class QuestionController {
  createQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const questionData = req.body;
      const newQuestion = await QuestionServices.createQuestion(questionData);
      res.status(201).json(newQuestion);
    } catch (error) {
      next(error);
    }
  };

  getAllQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {totalQuestion, questions} = await QuestionServices.getAllQuestions();
      res.status(200).json({totalQuestion, questions});
    } catch (error) {
      next(error);
    }
  };
  getQuestionById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const questionId = req.params.id;
      const question = await QuestionServices.getQuestionById(questionId);
      if (!question) {
        res.status(404).send();
        return;
      }
      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  };

  updateQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const questionId = req.params.id;
      const updatedQuestion = await QuestionServices.updateQuestion(
        questionId,
        req.body
      );
      if (!updatedQuestion) {
        res.status(404).send();
        return;
      }
      res.status(200).json(updatedQuestion);
    } catch (error) {
      next(error);
    }
  };

  deleteQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const questionId = req.params.id;
      const deletedQuestion = await QuestionServices.deleteQuestion(questionId);
      if (!deletedQuestion) {
        res.status(404).send();
        return;
      }
      res.status(200).json(deletedQuestion);
    } catch (error) {
      next(error);
    }
  };
}

export default new QuestionController();
