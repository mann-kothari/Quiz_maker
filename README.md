# Quiz Maker

## Introduction

Quiz Maker is a full-stack MERN web application that allows users to create, share, and attempt quizzes online. It features Google authentication, real-time leaderboards, and an intuitive interface for both quiz creators and participants. This app is ideal for educators, trainers, and anyone who wants to conduct quizzes easily and track performance.

## Installation

### Prerequisites

- Node.js (v16+)
- npm
- MongoDB Atlas account (or local MongoDB)
- Firebase project for Google Auth

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/quiz-app.git
   cd quiz-app/server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the `server` folder and add your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```
   node server.js
   ```

### Frontend Setup

1. Open a new terminal and navigate to the `client` folder:
   ```
   cd ../client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm start
   ```
4. The app will run at [http://localhost:3000](http://localhost:3000).

## Usage

- **Create Quiz:** Log in with Google, click "Create Quiz", add questions and options, and share the generated link.
- **Attempt Quiz:** Use the shared link or click "Attempt Quiz" to take a quiz.
- **View Leaderboard:** Click "Leaderboard" to see scores for quizzes you created.
- **Tutor Dashboard:** View analytics for all your quizzes.

## Contributing

Contributions are welcome!

- Fork the repository and create a new branch for your feature or bugfix.
- Submit a pull request with a clear description of your changes.
- Report bugs or request features via GitHub Issues.

## License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute this software for personal or commercial purposes. See [LICENSE](LICENSE)
