import { Router } from 'express'
import { addQuestion, addQuestions, addQuiz, getParticularQuiz, getParticularSolution, getQuiz } from '../controllers/quizControllers.js';
import { generateQuiz } from '../controllers/quizGenerate.js';
import upload from '../middlewares/upload.js';

const QuizRouter = Router();

QuizRouter.post('/quiz/add/', addQuiz);
QuizRouter.post('/quiz/add/question', upload.single('image'), addQuestion);
QuizRouter.post('/quiz/add/questions', addQuestions);
// QuizRouter.post('/quiz/add/option', upload.single('image'), addOption);
QuizRouter.get('/quiz/get/', getQuiz);
QuizRouter.post('/quiz/del/', addQuiz);
QuizRouter.get('/quiz/generate/', generateQuiz);
QuizRouter.get('/quiz/solution/:id', getParticularSolution);
QuizRouter.get('/quiz/:id', getParticularQuiz);

export default QuizRouter;