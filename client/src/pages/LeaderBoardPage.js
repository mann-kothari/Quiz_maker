import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../config/firebase";

const LeaderboardPage = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [expandedQuizId, setExpandedQuizId] = useState(null);
  const [leaderboards, setLeaderboards] = useState({});

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:5000/api/quizzes/by-creator/${user.uid}`)
      .then((res) => {
        console.log("fetched quizzes:", res.data);
        setQuizzes(res.data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const fetchLeaderboard = async (quizId) => {
    if (leaderboards[quizId]) {
      setExpandedQuizId(expandedQuizId === quizId ? null : quizId);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/leaderboard/${quizId}`
      );
      setLeaderboards((prev) => ({ ...prev, [quizId]: res.data }));
      setExpandedQuizId(quizId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🏆 Your Quizzes & Leaderboards
      </h1>
      {quizzes.length === 0 ? (
        <div className="text-center text-gray-500">No quizzes created yet.</div>
      ) : (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{quiz.title}</span>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => fetchLeaderboard(quiz._id)}>
                {expandedQuizId === quiz._id
                  ? "Hide Leaderboard"
                  : "Show Leaderboard"}
              </button>
            </div>
            {expandedQuizId === quiz._id && (
              <table className="w-full table-auto border mt-3">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Rank</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {(leaderboards[quiz._id] || []).map((entry, idx) => (
                    <tr key={entry._id} className="text-center border-t">
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">{entry.user}</td>
                      <td className="px-4 py-2">{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default LeaderboardPage;
