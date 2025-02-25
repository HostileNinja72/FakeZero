import Navbar from "../components/Navbar";
import Front from "../components/Front";

function Home() {
    return (
        <div>
            <Navbar />
            <div className="page-content">
                <Front />
            </div>
        </div>
    );
}

export default Home;
