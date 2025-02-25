import "../style/css/Front.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import verify from "../style/image/verify.png";

export default function Front() {
    const [text, setText] = useState("");
    const maxLength = 300;

    return (
        <div className="full">
            <div className="title">
                <div className="inter">
                    Detect Fake News Instantly with <span>AI</span>
                </div>
                <div className="p">
                    Our powerful AI-driven Fake News Detector helps you verify the credibility of news articles, social media posts, and online content in seconds.
                </div>
                <div className="create">Create Free Account</div>
            </div>
            <div className="enter">
                <textarea
                    className="ph"
                    placeholder="Paste your text"
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, maxLength))}
                ></textarea>
                <div className="last">
                    <div className="char-limit">{text.length} / {maxLength} characters </div>
                    <div className="verify">
                        <div>Verify</div>
                        <div>
                            <img className="play" src={verify} alt="logo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
