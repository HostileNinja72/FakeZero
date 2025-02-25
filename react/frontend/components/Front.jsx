import "../style/css/Front.css";
import { useState } from "react";
import verify from "../style/image/verify.png";

export default function Front() {
    const [text, setText] = useState("");
    const maxLength = 300;


    const fakeNewsSamples = [
        "NASA Confirms Secret Alien Colony Discovered on the Dark Side of the Moon!",
        "Banks to Replace All Money with Digital Brain Chips by 2026!",
        "Fast Food Chains Caught Using Lab-Grown Meat from Alien DNA!"
    ];

 
    const generateFakeNews = () => {
        const randomIndex = Math.floor(Math.random() * fakeNewsSamples.length);
        setText(fakeNewsSamples[randomIndex]);
    };

    return (
        <div className="full">
            <div className="title">
                <div className="inter">
                    Detect Fake News Instantly with <span>AI.</span>
                </div>
                <div className="p">
                    Our powerful AI-driven Fake News Detector helps you verify the credibility of news articles, social media posts, and online content in seconds.
                </div>
                <div className="create">Create Free Account</div>
            </div>

            <div className="enter">
                <div className="input-header">
                    <div className="check-title">Is it Fake or Real?</div>
                    <div className="example-section">
                        <span className="example-text">Try an example:</span>
                        <button className="generate-btn" onClick={generateFakeNews}>Generate</button>
                    </div>
                </div>

                <textarea
                    className="ph"
                    placeholder="Paste your text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <div className="last">
                    <div className={`char-limit ${text.length > maxLength ? "exceeded" : ""}`}>
                        {text.length} / {maxLength} characters
                    </div>
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
