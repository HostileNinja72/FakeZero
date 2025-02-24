import Navbar from "../components/Navbar"
import Register from "../components/Register"
import up from "../style/image/up1.jpeg"


export default function Registers()
{
    return (
        <div>
        <Navbar />
        <div className="product_up">           
            <img src={up} alt="flag"></img>
        </div>
        <Register />
        </div>);
};