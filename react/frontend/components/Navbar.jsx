import "../style/css/Navbar.css"
import React , {useState} from 'react'
import um6p from "../style/image/um6p.png"

function Navbar()
{
    return (
        <nav>
            <div><a href="/"><img className="logo" src={um6p} alt="logo"></img></a></div>
            <div className="sign">
                <div>sign up</div>
                <div> <span>sign in</span></div>
            </div>
        </nav>);
}

export default Navbar;
