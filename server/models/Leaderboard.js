const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  quizId: String,
  user: String,
  score: Number,
  attemptedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
