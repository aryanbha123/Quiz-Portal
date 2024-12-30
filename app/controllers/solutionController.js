import Quiz from "../models/Quiz.js"

export const Submission = async (req, res) => {
    try {
        const { userId, quizId, response } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });
        const submission = await SubmissionModel.findOne({ userId, quizId, isSubmitted: false });
        if (submission) return res.status(400).json({ message: "You have already submitted" });
        const newSubmission = new SubmissionModel({ userId, quizId, response, isSubmitted: true });
        await newSubmission.save();
        res.json({ message: "Submission successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }

}