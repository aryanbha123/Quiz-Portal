import express from 'express'
import cors from 'cors'
import { errorMiddleware } from './middlewares/error.js'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { corsConfig, db } from './config/config.js'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/authRoutes.js'
import axios from 'axios'
import solutionRouter from './routes/solutionRoutes.js'
import QuizRouter from './routes/quizRoutes.js'

dotenv.config({ path: './.env', });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT || 3000;

const app = express();
(async function connecting() {
  await db();
})();
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use(morgan('dev'));

app.get('/',(req,res)=>{
  res.send('Hello World!')
})



app.get('/university/data/:name/',async (req, res) => {
  try {
    const response = await axios.get('http://universities.hipolabs.com/search',{
      params: {
        name: req.params.name,
        country:"India"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.json([])
  }
});

// your routes here
app.use('/api/v1/auth/', AuthRouter);
app.use('/api/v1/solution/', solutionRouter);
app.use('/api/v1/', QuizRouter);


app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});

app.use(errorMiddleware);


app.listen(port, () => console.log('Server is working on Port:' + port + ' in ' + envMode + ' Mode.'));
