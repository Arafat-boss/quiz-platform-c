import { useState, useEffect } from "react";
import Question from "./Question";
import Scoreboard from "./Scoreboard";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);
  const [userAnswer, setUserAnswer] = useState("");

  console.log("Correct answers count:", currentQuestion);
  console.log("Score before setting state:", score);
  useEffect(() => {
    fetch("https://quiz-platform-server.vercel.app/api/quizzes")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  const handleAnswer = (selectedAnswer) => {
    if (questions[currentQuestion].type === "multiple-choice") {
      if (selectedAnswer === questions[currentQuestion].answer) {
        setScore((prevScore) => prevScore + 1);
      }
    } else {
      if (
        parseInt(userAnswer) === parseInt(questions[currentQuestion].answer)
      ) {
        setScore((prevScore) => prevScore + 1);
      }
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(30);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      {showScore ? (
        <Scoreboard score={score} total={questions.length} />
      ) : (
        <Question
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          timer={timer}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
        />
      )}

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
