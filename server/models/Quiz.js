const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct: String,
});

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
  timeLimit: { type: Number, required: true },
  // maxAttempts: { type: Number, default: 1 },
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", quizSchema);
