
import express from 'express';
import examController from '../controller/exam.controller';
import upload from '../utils/fileUpload';
import Authentication from '../middleware/authentication';
import questionController from '../controller/question.controller';

export default class QuestionRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {

    this.router.post('/add', Authentication.authUser, Authentication.authAdmin , questionController.createQuestion);
    this.router.get('/Allquestions',Authentication.authUser, Authentication.authAdmin, questionController.getAllQuestions);
    this.router.get('/questions/:id', Authentication.authUser, Authentication.authAdmin, questionController.getQuestionById);
    this.router.put('/update/:id', Authentication.authUser, Authentication.authAdmin, questionController.updateQuestion);
    this.router.delete('/questions/:id', Authentication.authUser, Authentication.authAdmin,  questionController.deleteQuestion);
    
}

  public getRouter() {
    return this.router;
  }
}