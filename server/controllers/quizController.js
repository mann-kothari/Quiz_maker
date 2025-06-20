const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  const { title, questions, timeLimit, createdBy } = req.body;
  try {
    const newQuiz = new Quiz({ title, questions, timeLimit, createdBy });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error("Error creating quiz:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.status(200).json(quiz);
  } catch (err) {
    res.status(404).json({ error: "Quiz not found" });
  }
};

exports.getQuizzesByCreator = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.params.creatorId }).sort({
      createdAt: -1,
    });
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
