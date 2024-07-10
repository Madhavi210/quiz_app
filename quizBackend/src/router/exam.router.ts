
import express from 'express';
import examController from '../controller/exam.controller';
import upload from '../utils/fileUpload';
import Authentication from '../middleware/authentication';

export default class ExamRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {

    this.router.post('/', Authentication.authUser, examController.generateFirstTimeExam)
    this.router.post('/nextExam', Authentication.authUser, examController.generateNextExam)
    this.router.post('/submit-answers', Authentication.authUser, examController.submitAnswers);
    this.router.get('/exam-history/:id', Authentication.authUser, examController.getExamHistory);
    
}

  public getRouter() {
    return this.router;
  }
}