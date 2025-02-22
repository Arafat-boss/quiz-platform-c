const Question = ({ question, onAnswer, timer, userAnswer, setUserAnswer }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAnswer(userAnswer);
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="question-container bg-white p-6 rounded-lg shadow-lg">
      <div className="quiz-header text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Start Quiz</h2>
        <p className="text-gray-600 mt-2">
          Take on the Challenge and See if You Can Ace This Quiz with Flying
          Colors – It’s Time to Show What You’ve Got!
        </p>
      </div>
      {/* Question Text */}
      <h2 className="text-2xl font-bold text-gray-800">{question?.question}</h2>
      <p className="text-md text-gray-600 mt-2">Time Left: {timer} seconds</p>

      {/* Answer Options */}
      {question?.type === "multiple-choice" ? (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              className="flex items-center border border-gray-300 rounded-lg p-4 text-gray-800 font-semibold text-lg hover:bg-blue-100 transition"
              onClick={() => onAnswer(option.split(".")[0].trim())} // Extract "A", "B", etc.
            >
              {/* Option Label (A, B, C, D) */}
              <span className="mr-4 bg-white border border-gray-400 px-4 py-2 font-bold text-gray-700 rounded">
                {optionLabels[index]}
              </span>
              {/* Option Text */}
              {option}
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="border border-gray-300 p-3 w-full rounded-md"
          />
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white p-3 rounded-lg w-full hover:bg-green-600"
          >
            Submit Answer
          </button>
        </form>
      )}
    </div>
  );
};

export default Question;
