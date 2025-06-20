const Leaderboard = require("../models/Leaderboard");

exports.submitScore = async (req, res) => {
  const { quizId, user, score } = req.body;
  try {
    const entry = new Leaderboard({ quizId, user, score });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const entries = await Leaderboard.find({ quizId: req.params.quizId }).sort({
      score: -1,
    });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
