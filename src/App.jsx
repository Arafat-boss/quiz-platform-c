import Quiz from "./components/Quiz";
import bgImg from "./assets/authentication.png";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      
      <div
        className="h-screen "
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <div className="lg:pt-20 pt-10">
          <Quiz></Quiz>
        </div>
      </div>
    </>
  );
}

export default App;
