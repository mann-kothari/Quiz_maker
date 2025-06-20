// src/pages/AttemptQuiz.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../config/firebase";

const AttemptQuiz = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("id");
  const { user } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quizzes/${quizId}`)
      .then((res) => {
        setQuiz(res.data);
        setTimeLeft(res.data.timeleft * 60);
      })
      .catch((err) => {
        setError("Failed to load quiz. Please try again later.");
      });
  }, [quizId]);

  useEffect(() => {
    if (timeLeft === 0) {
      // handleSubmit(); // auto submit
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionChange = (qIndex, answer) => {
    setAnswers({ ...answers, [qIndex]: answer });
  };

  const handleSubmit = async () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correct === answers[i]) correct++;
    });
    setScore(correct);

    await axios.post(`http://localhost:5000/api/leaderboard`, {
      quizId,
      user: user.displayName,
      score: correct,
    });
  };

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  if (!quiz) {
    return <div className="text-center mt-10">Loading Quiz...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{quiz.title}</h1>
      <div>
        Time left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </div>
      {quiz.questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-semibold">{q.question}</p>
          {q.options.map((opt, idx) => (
            <div key={idx} className="ml-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={`question-${i}`}
                  value={opt}
                  onChange={() => handleOptionChange(i, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
        Submit Quiz
      </button>

      {score !== null && (
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold">
            Your Score: {score} / {quiz.questions.length}
          </h2>
        </div>
      )}
    </div>
  );
};

export default AttemptQuiz;
