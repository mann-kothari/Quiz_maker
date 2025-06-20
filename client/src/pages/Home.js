import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-10 text-blue-700">
        🎓 Online Quiz Maker
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-2xl shadow-lg transition duration-300"
          onClick={() => navigate("/create")}>
          ➕ Create Quiz
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl shadow-lg transition duration-300"
          onClick={() => navigate("/attempt")}>
          📝 Attempt Quiz
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-2xl shadow-lg transition duration-300"
          onClick={() => navigate("/leaderboard")}>
          🏆 View Leaderboard
        </button>
        <button
          to="/dashboard"
          className="bg-red-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl shadow">
          Tutor Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;
