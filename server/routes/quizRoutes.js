const express = require("express");
const {
  createQuiz,
  getQuizById,
  getQuizzesByCreator,
} = require("../controllers/quizController");
const router = express.Router();

router.post("/create", createQuiz);
router.get("/:id", getQuizById);
router.get("/by-creator/:creatorId", getQuizzesByCreator);

module.exports = router;
