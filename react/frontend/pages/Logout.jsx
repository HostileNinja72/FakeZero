import React from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // const refresh_token = localStorage.getItem(REFRESH_TOKEN);
        // api.post(`http://localhost:8000/api/logout/`, { refresh_token })
        // .then((res) => {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            navigate("/");
            // toast.error("Logged out successfully.");
        // })
        // .catch((err) => {
        //     // console.error(err);
        //     // toast.error("Error logging out.");
        // });
        // localStorage.removeItem("user");
    };

    return <div>
        <h1 onClick={handleLogout}>Logout</h1>
        </div>
}

export default Logout;