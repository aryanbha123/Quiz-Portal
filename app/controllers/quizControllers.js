import Quiz from '../models/Quiz.js';
import Solution from '../models/Solution.js';
import sendRes from '../utils/sendRes.js';
import { z } from 'zod';

const quizSchema = z.object({
    creator: z.string().nonempty("Creator is required"),
    title: z.string().nonempty("Title is required"),
    duration: z.number().positive("Duration must be a positive number"),
    questions: z.array(z.object({
        question: z.string().nonempty("Question is required"),
        marks: z.number().positive("Marks must be a positive number"),
        category: z.string().nonempty("Category is required"),
        image: z.string().optional(),
        answer: z.string().optional(),
    })).optional(),
    marks: z.number().positive("Marks must be a positive number"),
    category:z.string().optional(),
    tags:z.string().optional(),
    difficulty:z.string().optional(),
});

const questionSchema = z.object({
    question: z.string().nonempty("Question is required"),
    quizId: z.string().nonempty("Quiz ID is required"),
    marks: z.number().positive("Marks must be a positive number"),
    negative:z.number().negative("Must be a negative number"),
    category: z.string().nonempty("Category is required"),
    image: z.string().optional(),
    answer: z.string().optional(),
});

export const addQuiz = async (req, res) => {
    try {
        const reqQuiz = quizSchema.parse(req.body);
        const newQuiz = new Quiz(reqQuiz);
        await newQuiz.save();
        return sendRes("Quiz Created Successfully", 200, true, res);
    } catch (error) {
        return sendRes(error.errors || error.message, 400, false, res);
    }
};

export const addQuestion = async (req, res) => {
    try {
        const questionToAdd = questionSchema.parse(req.body);

        const quiz = await Quiz.findById(questionToAdd.quizId);
        if (!quiz) return sendRes("Quiz not found", 404, false, res);

        if (req.file) questionToAdd.image = req.file.path;

        quiz.questions.push(questionToAdd);
        await quiz.save();

        return sendRes("Question Added Successfully", 200, true, res);
    } catch (error) {
        return sendRes(error.errors || error.message, 400, false, res);
    }
};

export const addQuestions = async (req, res) => {
    try {
        const { data, quizId } = req.body;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) return sendRes("Quiz not found", 404, false, res);

        const validQuestions = data.map((q) => questionSchema.parse(q));
        quiz.questions.push(...validQuestions);

        await quiz.save();
        return sendRes("Questions added successfully", 200, true, res);
    } catch (error) {
        return sendRes(error.errors || error.message, 400, false, res);
    }
};

export const getQuiz = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit) || 10, 100);
        const search = req.query.search || "";
        const skip = (page - 1) * limit;

        const query = search ? { title: { $regex: search, $options: "i" } } : {};

        const [quizzes, totalItems] = await Promise.all([
            Quiz.find(query)
                .skip(skip)
                .limit(limit)
                .populate({ path: 'creator', select: '-password' })
                .lean(),
            Quiz.countDocuments(query),
        ]);

        const response = {
            status: true,
            data: quizzes,
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
        };

        res.status(200).json(response);
    } catch (error) {
        sendRes("Failed to fetch quizzes", 500, false, res);
    }
};

export const getParticularQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz) return sendRes("Quiz Not Found", 404, false, res);
        return res.json(quiz);
    } catch (error) {
        return sendRes("Internal Server Error", 500, false, res);
    }
};

export const getParticularSolution = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) return sendRes("User ID is required", 400, false, res);

        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz) return sendRes("Quiz Not Found", 404, false, res);

        let solution = await Solution.findOne({ quizId: quiz._id, userId });
        if (!solution) {
            solution = new Solution({ quizId: quiz._id, userId });
            await solution.save();
        }

        return res.status(200).json({ quiz, solution });
    } catch (error) {
        return sendRes("Internal Server Error", 500, false, res);
    }
};
