import { useState, useEffect } from "react";
import Question from "./Question";
import Scoreboard from "./Scoreboard";
import axios from "axios";

const Quiz = () => {
  // State variables
  const [questions, setQuestions] = useState([]); // Stores the list of questions fetched from the API
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the current question index
  const [score, setScore] = useState(0); // Tracks the user's score
  const [showScore, setShowScore] = useState(false); // Controls whether to show the scoreboard or the question
  const [timer, setTimer] = useState(30); // Timer for each question
  const [userAnswer, setUserAnswer] = useState(""); // Stores the user's answer for input-based questions

  // Logging for debugging purposes
  // console.log("Correct answers count:", currentQuestion);
  // console.log("Score before setting state:", score);

  // Fetch quiz questions from the API on component mount
  useEffect(() => {
    axios
      .get("https://quiz-platform-server.vercel.app/api/quizzes")
      .then((response) => {
        setQuestions(response.data); // Update state with fetched questions
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, []);

  // Timer logic: Decrease timer every second
  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval); // Cleanup interval on unmount or timer change
    } else {
      handleNextQuestion(); // Move to the next question when the timer runs out
    }
  }, [timer]);

  // Handle user's answer submission
  const handleAnswer = (selectedAnswer) => {
    const currentQ = questions[currentQuestion];

    // Check if the answer is correct based on the question type
    if (currentQ.type === "multiple-choice") {
      if (selectedAnswer === currentQ.answer) {
        setScore((prevScore) => prevScore + 1); // Increment score for correct answer
      }
    } else {
      if (parseInt(userAnswer) === parseInt(currentQ.answer)) {
        setScore((prevScore) => prevScore + 1); // Increment score for correct numeric answer
      }
    }

    handleNextQuestion(); // Move to the next question
  };

  // Move to the next question or show the scoreboard if all questions are answered
  const handleNextQuestion = () => {
    setUserAnswer(""); // Reset user's answer input
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1); // Go to the next question
      setTimer(30); // Reset the timer
    } else {
      setShowScore(true); // Show the scoreboard if all questions are answered
    }
  };

  return (
    <div className="quiz-container p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      {showScore ? (
        // Display the scoreboard if the quiz is finished
        <Scoreboard score={score} total={questions.length} />
      ) : (
        // Display the current question and answer options
        <Question
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          timer={timer}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
        />
      )}

      {/* Display the timer */}
      <div className="timer mt-4 text-center">
        {!score && (
          <span className="text-lg font-semibold text-gray-700">
            Time Left: {timer}s
          </span>
        )}
      </div>
    </div>
  );
};

export default Quiz;