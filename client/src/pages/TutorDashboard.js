import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../config/firebase"; // Firebase context or hook

const TutorDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`http://localhost:5000/api/quiz/analytics/${currentUser.uid}`)
        .then((res) => setQuizzes(res.data))
        .catch((err) => console.error(err));
    }
  }, [currentUser]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">
        📊 Your Quiz Dashboard
      </h2>

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes created yet.</p>
      ) : (
        quizzes.map((quiz, index) => (
          <div key={index} className="bg-white p-6 mb-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-indigo-700">
                {quiz.title}
              </h3>
              <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                Attempts: {quiz.attempts.length}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-700 mb-1 font-semibold">
                Student Scores:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {quiz.attempts.map((attempt, i) => (
                  <li key={i}>
                    {attempt.user?.email || "Unknown"} —{" "}
                    <span className="text-green-600 font-medium">
                      {attempt.score}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TutorDashboard;
