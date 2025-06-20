import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const QuizResultsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, total, selectedAnswers, quizQuestions } = state || {};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Quiz Results
      </h2>
      <p className="text-xl mb-4">
        You scored {score} out of {total}
      </p>

      <div className="space-y-4">
        {quizQuestions.map((q, i) => (
          <div key={i} className="bg-white shadow p-4 rounded">
            <p className="font-semibold">
              {i + 1}. {q.question}
            </p>
            <p className="text-sm">✅ Correct Answer: {q.correctAnswer.text}</p>
            <p
              className={`text-sm ${
                selectedAnswers[i] === q.correctAnswer
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
              📝 Your Answer: {selectedAnswers[i] || "Not answered"}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/")}
          className="mr-4 px-4 py-2 bg-indigo-600 text-white rounded">
          Home
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className="px-4 py-2 bg-gray-600 text-white rounded">
          View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default QuizResultsPage;
