import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { FaArrowLeft } from "react-icons/fa";

const Scoreboard = ({ score, total }) => {
  const [scoreHistory, setScoreHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  console.log("Score passed to Scoreboard:", score, total);
  // Load scores from MongoDB
  useEffect(() => {
    axios.get(`http://localhost:9000/api/scores/${user.email}`)
      .then((res) => setScoreHistory(res.data))
      .catch((err) => console.error("Error fetching scores:", err));
  }, []);

  // Save score when updated
  useEffect(() => {
    if (score !== null && user?.email) {
      console.log(user); // Check if user object contains email
      const newScore = { score,total, email: user.email, date: new Date().toISOString() };
  
      axios.post("http://localhost:9000/api/scores", newScore)
        .then(() => {
          setScoreHistory((prev) => [newScore, ...prev]);
        })
        .catch((err) => console.error("Error saving score:", err));
    }
  }, [score, user?.email]);

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-blue-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">🏆 Scoreboard 🏆</h2>
      <p className="text-center text-lg font-semibold">Congratulations {user?.displayName}!</p>
      <p className="text-center text-lg font-semibold">
        Your Score: {score} / {total}
      </p>

      <div className="mt-4">
        <Link to="/quizeAgain">
          <button className="btn btn-accent text-white">Try Again</button>
        </Link>
        <Link to="/">
          <button className="btn btn-outline btn-primary ml-2"><FaArrowLeft />Back to Home</button>
        </Link>

        <h3 className="text-lg font-semibold mt-4">Previous Scores:</h3>
        <ul className="list-disc pl-5">
          {scoreHistory.length > 0 ? (
            scoreHistory.slice(0, 5).map((entry, index) => (
              <h2 key={index} className="text-sm">
                {entry.score}/10 - 
                <span className="text-gray-500"> {new Date(entry.date).toLocaleString()}</span>
              </h2>
            ))
          ) : (
            <p className="text-gray-500">No previous scores found.</p>
          )}
        </ul>

        {scoreHistory.length > 5 && (
          <button 
            className="text-blue-500 underline cursor-pointer mt-2"
            onClick={() => setShowModal(true)}
          >
            See More
          </button>
        )}
      </div>

      {/* Modal (Without Background Overlay) */}
      {showModal && (
        <div className="absolute top-20 right-10 bg-white p-6 rounded-lg shadow-lg w-96 border">
          <h2 className="text-xl font-bold text-center mb-4">All Scores</h2>
          <ul className="list-disc pl-5 max-h-60 overflow-y-auto">
            {scoreHistory.map((entry, index) => (
              <li key={index} className="text-sm">
                {entry.score}/10 - 
                <span className="text-gray-500"> {new Date(entry.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
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
