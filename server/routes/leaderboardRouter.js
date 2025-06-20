const express = require("express");
const router = express.Router();
const {
  submitScore,
  getLeaderboard,
} = require("../controllers/leaderboardController");

router.post("/", submitScore);
router.get("/:quizId", getLeaderboard);
router.get("/", async (req, res) => {
  try {
    const entries = await Leaderboard.find({});
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
