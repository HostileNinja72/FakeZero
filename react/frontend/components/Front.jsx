import "../style/css/Front.css";
import { useState } from "react";
import axios from "axios";
import verify from "../style/image/verify.png";

export default function Front() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const maxLength = 300;

    const fakeNewsSamples = [
        "NASA Confirms Secret Alien Colony Discovered on the Dark Side of the Moon!",
        "Banks to Replace All Money with Digital Brain Chips by 2026!",
        "Fast Food Chains Caught Using Lab-Grown Meat from Alien DNA!",
        "New Study Finds That Drinking Coffee Can Permanently Alter Your DNA",
        "Government to Implement Nationwide Social Media Shutdown on Weekends to Improve Mental Health",
        "Major Banks Announce Plans to Remove ATMs by 2026, Moving to Fully Digital Transactions"
    ];

    const generateFakeNews = () => {
        const randomIndex = Math.floor(Math.random() * fakeNewsSamples.length);
        setText(fakeNewsSamples[randomIndex]);
    };

    const analyzeText = async () => {
        if (!text.trim()) {
            setError("Please enter some text before verifying.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        console.log("🔄 Sending request to API...");

        try {
            const response = await axios.post("http://django:8000/api/analyze/", { text });


            console.log("✅ API Response:", response.data);

            setResult(response.data);
        } catch (error) {
            console.error("❌ Error analyzing text:", error);

            // Check if response exists
            if (error.response) {
                console.log("❌ API Error Response:", error.response.data);
                setError(error.response.data.error || "Error analyzing text.");
            } else {
                setError("Server unreachable. Make sure the backend is running.");
            }
        }

        setLoading(false);
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
                    <div className="verify" onClick={analyzeText}>
                        <div>{loading ? "Checking..." : "Verify"}</div>
                        <div>
                            <img className="play" src={verify} alt="logo" />
                        </div>
                    </div>
                </div>

                {/* Show error messages */}
                {error && <div className="error"><p>❌ {error}</p></div>}

                {/* Show results if available */}
                {result && (
                    <div className="result">
                        <h3>Fake News Prediction: {result.fake_news.prediction}</h3>
                        <p>Confidence: {JSON.stringify(result.fake_news.confidence)}</p>
                        <h3>Category: {result.category.prediction}</h3>
                        <p>Confidence: {JSON.stringify(result.category.confidence)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
