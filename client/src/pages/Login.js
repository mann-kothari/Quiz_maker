import React from "react";
import { useAuth } from "../config/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    await loginWithGoogle();
    const params = new URLSearchParams(location.search);
    const quizId = params.get("id");

    if (user) {
      await axios.post("http://localhost:5000/api/users/register", {
        uid: user.uid,
        email: user.email,
        name: user.displayName, // optional, if you want to store name
      });
    }
    if (quizId) {
      if (location.pathname === "/leaderboard") {
        navigate(`/leaderboard?id=${quizId}`);
      } else {
        navigate(`/attempt?id=${quizId}`);
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          Login to Quiz Maker
        </h2>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg">
          🔐 Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
