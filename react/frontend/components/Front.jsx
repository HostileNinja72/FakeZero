import "../style/css/Front.css";
import { useNavigate } from 'react-router-dom';
import verify from "../style/image/verify.png"



export default function Front()
{
    return (
   <div className="full">
    <div className="title">
        <div className="inter">Detect Fake News Instantly with <span>AI</span>  </div>
        <div className="p">Our powerful AI-driven Fake News Detector helps you verify the credibility of news articles, social media posts, and online content in seconds.</div>
        <div className="create">Create Free Account</div>
    </div>
    <div className="enter">
        <input className="ph" placeholder="Paste your text"></input>
        <div className="last">

        <div className="verify"><div>Verify</div>
        <div><img className="play" src={verify} alt="logo"></img></div>
        </div>
        </div>
    </div>
   </div>)
}