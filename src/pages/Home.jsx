import Hero from "../components/Hero";
import Navbar from "../components/Navbar";


const Home = () => {
    return (
        <div>
            <div className="flex justify-center items-center ">
            <Navbar></Navbar>
            </div>
            <Hero></Hero>
        </div>
    );
};

export default Home;