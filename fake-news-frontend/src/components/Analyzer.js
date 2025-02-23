import React, { useState } from "react";
import axios from "axios";

const Analyzer = () => {
    const [article, setArticle] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://127.0.0.1:8000/predict/", { article });
        setResult(response.data);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800">Paste your text below</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={article}
                    onChange={(e) => setArticle(e.target.value)}
                    placeholder="Enter article text here..."
                    required
                />
                <button type="submit" className="w-full mt-4 bg-black text-white py-2 rounded-md">Analyze</button>
            </form>
            {result && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Result</h3>
                    <p><strong>Label:</strong> {result.label}</p>
                    <p><strong>Confidence:</strong> {result.confidence.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default Analyzer;
