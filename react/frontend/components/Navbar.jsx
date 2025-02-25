import React from "react";
import "../style/css/Navbar.css";
import um6p from "../style/image/ceoped.png";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <a href="/">
                    <img className="logo" src={um6p} alt="UM6P Logo" />
                </a>
            </div>
            <div className="nav-sign">
                <div className="sign-up">Sign Up</div>
                <div className="sign-in"><span>Sign In</span></div>
            </div>
        </nav>
    );
}

export default Navbar;
