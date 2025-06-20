// import logo from "./logo.svg";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import AttemptQuiz from "./pages/AttemptQuiz";
import LeaderboardPage from "./pages/LeaderBoardPage";
import Login from "./pages/Login";
import QuizResultsPage from "./pages/QuizResultsPage";
import { AuthProvider } from "./config/firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import TutorDashboard from "./pages/TutorDashboard";
import NavBar from "./components/NavBar";
import About from "./pages/About";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attempt"
            element={
              <ProtectedRoute>
                <AttemptQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<TutorDashboard />} />
          <Route path="/results" element={<QuizResultsPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
