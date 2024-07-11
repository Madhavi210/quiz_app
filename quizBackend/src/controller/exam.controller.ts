// examController.ts
import { Request, Response, NextFunction } from "express";
import ExamServices from "../service/exam.service";
// import CustomRequest from "../types/typeExtention";
import { Result } from "../model/result.model";
import Exam from "../model/exam.model";

class ExamController {
  generateFirstTimeExam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.body;
      const questions = await ExamServices.generateFirstTimeExam(
        userId as string
      );

      res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  };

  submitAnswers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.body;
      const { examId, answers } = req.body;
      const result = await ExamServices.submitAnswers(
        userId as string,
        examId,
        answers
      );
      res.status(200).json({
        message: "Answers submitted successfully",
        score: result.score,
      });
    } catch (error) {
      next(error);
    }
  };


  generateNextExam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {userId} = req.body  ;
      const { nextExamQuestions, nextExam } = await ExamServices.generateNextExam(
        userId as string
      );

      res.status(200).json({
        nextExamQuestions,
        examId: nextExam._id,
        userId: nextExam.user.toString()
      });
    } catch (error) {
      next(error);
    }
  };

  getExamHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;

      if (!userId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }

      const results = await ExamServices.getExamHistory(userId);

      res.status(200).json(results);

    } catch (error) {
      console.error('Error in getExamHistory controller:', error);
      res.status(500).json({ message: 'Failed to fetch exam history' });
    }
  }

}

export default new ExamController();
