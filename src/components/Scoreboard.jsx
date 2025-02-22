import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { FaArrowLeft } from "react-icons/fa";

const Scoreboard = ({ score, total }) => {
  // State variables
  const [scoreHistory, setScoreHistory] = useState([]); // Stores the user's score history fetched from the database
  const [showModal, setShowModal] = useState(false); // Controls the visibility of the "See More" modal
  const { user } = useContext(AuthContext); // Access the authenticated user's data from the context

  // Logging for debugging purposes
  console.log("Score passed to Scoreboard:", score, total);

  // Fetch the user's score history from the database on component mount
  useEffect(() => {
    axios
      .get(`https://quiz-platform-server.vercel.app/api/scores/${user.email}`)
      .then((res) => setScoreHistory(res.data)) // Update state with fetched score history
      .catch((err) => console.error("Error fetching scores:", err));
  }, []);

  // Save the current score to the database when the score or user email changes
  useEffect(() => {
    if (score !== null && user?.email) {
      console.log(user); // Debugging: Check if the user object contains the email
      const newScore = {
        score,
        total,
        email: user.email,
        date: new Date().toISOString(), // Add the current date and time
      };

      // Save the new score to the database
      axios
        .post("https://quiz-platform-server.vercel.app/api/scores", newScore)
        .then(() => {
          setScoreHistory((prev) => [newScore, ...prev]); // Update the score history state with the new score
        })
        .catch((err) => console.error("Error saving score:", err));
    }
  }, [score, user?.email]);

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-blue-100 shadow-lg rounded-lg">
      {/* Scoreboard Header */}
      <h2 className="text-2xl font-bold text-center mb-4">🏆 Scoreboard 🏆</h2>
      <p className="text-center text-lg font-semibold">Congratulations {user?.displayName}!</p>
      <p className="text-center text-lg font-semibold">
        Your Score: {score} / {total}
      </p>

      <div className="mt-4">
        {/* Back to Home Button */}
        <Link to="/">
          <button className="btn btn-outline btn-primary ml-2">
            <FaArrowLeft /> Back to Home
          </button>
        </Link>

        {/* Display Previous Scores */}
        <h3 className="text-lg font-semibold mt-4">Previous Scores:</h3>
        <ul className="list-disc pl-5">
          {scoreHistory.length > 0 ? (
            // Show up to 5 most recent scores
            scoreHistory.slice(0, 5).map((entry, index) => (
              <h2 key={index} className="text-sm">
                {entry.score}/10 - 
                <span className="text-gray-500"> {new Date(entry.date).toLocaleString()}</span>
              </h2>
            ))
          ) : (
            // Show a message if no scores are found
            <p className="text-gray-500">No previous scores found.</p>
          )}
        </ul>

        {/* "See More" Button (Shows when there are more than 5 scores) */}
        {scoreHistory.length > 5 && (
          <button
            className="text-blue-500 underline cursor-pointer mt-2"
            onClick={() => setShowModal(true)}
          >
            See More
          </button>
        )}
      </div>

      {/* Modal to Display All Scores */}
      {showModal && (
        <div className="absolute top-20 right-10 bg-white p-6 rounded-lg shadow-lg w-96 border">
          <h2 className="text-xl font-bold text-center mb-4">All Scores</h2>
          <ul className="list-disc pl-5 max-h-60 overflow-y-auto">
            {/* Display all scores in a scrollable list */}
            {scoreHistory.map((entry, index) => (
              <li key={index} className="text-sm">
                {entry.score}/10 - 
                <span className="text-gray-500"> {new Date(entry.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          {/* Close Modal Button */}
          <button
            className="btn btn-error w-full mt-4"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Scoreboard;