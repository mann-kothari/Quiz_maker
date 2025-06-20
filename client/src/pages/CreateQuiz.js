import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../config/firebase";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState(10);
  const [shareLink, setShareLink] = useState("");
  const [currentQ, setCurrentQ] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswerIndex: null, // use index instead of value
  });

  const { user } = useAuth();

  const handleOptionChange = (value, index) => {
    const newOptions = [...currentQ.options];
    newOptions[index] = value;
    setCurrentQ({ ...currentQ, options: newOptions });
  };

  const addQuestion = () => {
    if (
      currentQ.question.trim() &&
      currentQ.options.every((opt) => opt.trim()) &&
      currentQ.correctAnswerIndex !== null
    ) {
      setQuestions([
        ...questions,
        {
          question: currentQ.question,
          options: currentQ.options,
          correct: currentQ.options[currentQ.correctAnswerIndex],
        },
      ]);
      setCurrentQ({
        question: "",
        options: ["", "", "", ""],
        correctAnswerIndex: null,
      });
    }
  };

  const createQuiz = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/quizzes/create",
        {
          title,
          questions,
          timeLimit,
          createdBy: user.uid, // replace with actual UID or email from Firebase auth
        }
      );
      const quizId = response.data._id;
      setShareLink(`http://localhost:3000/attempt?id=${quizId}`);
      alert(`Quiz Created!`);
    } catch (err) {
      console.error(err);
      alert("Error creating quiz");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">
        🛠️ Create a New Quiz
      </h2>

      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded-xl"
      />

      <div className="bg-white p-4 border rounded-xl mb-6">
        <h3 className="text-xl font-semibold mb-2">Add Question</h3>
        <input
          type="text"
          placeholder="Question"
          value={currentQ.question}
          onChange={(e) =>
            setCurrentQ({ ...currentQ, question: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        />

        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center mb-2">
            <input
              type="radio"
              name="correct"
              checked={currentQ.correctAnswerIndex === i}
              onChange={() =>
                setCurrentQ({ ...currentQ, correctAnswerIndex: i })
              }
              className="mr-2"
            />
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              value={currentQ.options[i]}
              onChange={(e) => handleOptionChange(e.target.value, i)}
              className="flex-1 p-2 border rounded"
            />
          </div>
        ))}

        <button
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={addQuestion}>
          ➕ Add Question
        </button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Time Limit (minutes)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          className="w-full mb-4 p-2 border rounded-xl"
        />
      </div>

      {questions.length > 0 && (
        <div className="mb-4 text-green-700 font-semibold">
          ✅ {questions.length} Question(s) Added
        </div>
      )}
      {questions.length > 0 && (
        <ul className="mb-4">
          {questions.map((q, idx) => (
            <li key={idx} className="text-grey-700">
              {idx + 1}. {q.question}
            </li>
          ))}
        </ul>
      )}

      <button
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl shadow"
        onClick={createQuiz}>
        🚀 Create Quiz
      </button>
      {shareLink && (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <div>Share this link with the students:</div>
          <input
            type="text"
            value={shareLink}
            readOnly
            className="w-full p-2 boarder rounded mb-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareLink)}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
