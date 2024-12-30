import {Router} from 'express'
import { Submission } from '../controllers/solutionController.js';

const solutionRouter = Router();



solutionRouter.get('/timestamp' , () => {});
solutionRouter.post('/ufm' , () => {});
solutionRouter.post('/user/submit/' , Submission);
solutionRouter.post('/auto/submit' , () => {});

export default solutionRouter;