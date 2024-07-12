import { Types } from "mongoose";
import Exam from "../model/exam.model";
import Question from "../model/question.model";
import { Result } from "../model/result.model";
import mongoose from "mongoose";

class ExamServices {

  async generateFirstTimeExam(userId: string): Promise<any[]> {
    const easyQuestions = await Question.aggregate([
      { $match: { difficulty: { $lte: 3 } } },
      { $sample: { size: 10 } },
    ]);

    if (easyQuestions.length === 0) {
      throw new Error(`Question Not Found!`);
    }

    const exam = new Exam({
      user: new mongoose.Types.ObjectId(userId),
      questions: easyQuestions.map((question) => ({
        question: question._id,
        difficulty: question.difficulty,
      })),
    });

    const savedExam = await exam.save();

    const populatedExam = await Exam.aggregate([
      { $match: { _id: new Types.ObjectId(savedExam._id as any) } },
      { $unwind: "$questions" },
      {
        $lookup: {
          from: "questions",
          localField: "questions.question",
          foreignField: "_id",
          as: "questionDetails"
        }
      },
      { $unwind: "$questionDetails" },
      {
        $project: {
          _id: 1,
          user: 1,
          date: 1,
          questions: {
            question: "$questions.question",
            difficulty: "$questions.difficulty",
            text: "$questionDetails.text",
            options: "$questionDetails.options"
          }
        }
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          date: { $first: "$date" },
          questions: { $push: "$questions" }
        }
      }
    ]);

    return populatedExam;
  }


submitAnswers = async (
  userId: string,
  examId: string,
  answers: { questionId: string; answer: string }[]
): Promise<any> => {
  const exam = await Exam.findById(examId).populate('questions.question');
  
  if (!exam) {
    throw new Error("Exam not found");
  }
  
  // if (exam.user.toString() != userId) {
  //   throw new Error("Unauthorized Access");
  // }

  let score = 0;
  for (const ans of answers) {
    const question = exam.questions.find(
      (q) => q.question._id.toString() === ans.questionId
    );

    if (question) {
      let correctAnswer = await Question.findOne({ _id: ans.questionId });
      if (correctAnswer?.correctAnswer === ans.answer) {
        score++;
      }
    }
  }

  const avgScore = (score / answers.length) * 100;

  const result = new Result({
    user: userId,
    exam: examId,
    answers: answers.map((ans) => ({
      question: ans.questionId,
      userAnswer: ans.answer,
    })),
    score,
    avgScore,
  });

  return await result.save();
};


  generateNextExam = async (userId: string): Promise<any> => {
    const results = await Result.find({ user: userId });

    if (results.length === 0) {
      throw new Error(`You have to appear for first exam`);
    }

    const totalAvgScore = results.reduce(
      (sum, result) => sum + result.avgScore,
      0
    );
    const avgScore = results.length > 0 ? totalAvgScore / results.length : 0;
    
    let difficultyQuery;
    if (avgScore >= 70) {
      difficultyQuery = { $gte: 8 };
    } else if (avgScore >= 50) {
      difficultyQuery = { $gte: 5, $lte: 7 };
    } else {
      difficultyQuery = { $lte: 3 };
    }    

    const nextExamQuestions = await Question.aggregate([
      { $match: { difficulty: difficultyQuery } },
      { $sample: { size: 10 } },
    ]);

    if (nextExamQuestions.length === 0) {
      throw new Error("No questions found for the next exam");
    }    

    const nextExam = new Exam({
      user: userId,
      questions: nextExamQuestions.map((question) => ({
        question: question._id,
        difficulty: question.difficulty,
      })),
    });
    
    await nextExam.save();

    return {nextExamQuestions, nextExam};
  };


  getExamHistory = async (userId: string): Promise<any> => {
    try {
      
      const results = await Result.find({ user: userId })
        .populate('exam', 'examName') 
        .populate('user', 'name') 
        .exec();

      console.log(results,"result");
      
      return results;
    } catch (error) {
      console.error('Error fetching exam history:', error);
      throw new Error('Failed to fetch exam history');
    }
  }

}

export default new ExamServices();
