import React from "react";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
            <h1 className="text-2xl font-bold text-gray-900">FakeZero</h1>
            <div className="space-x-6">
                <a href="#" className="text-gray-600 hover:text-black">Home</a>
                <a href="#" className="text-gray-600 hover:text-black">About</a>
                <a href="#" className="text-gray-600 hover:text-black">Contact</a>
                <button className="px-4 py-2 bg-black text-white rounded-lg">Get Started</button>
            </div>
        </nav>
    );
};

export default Navbar;
