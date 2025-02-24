import { useState } from "react"
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom"
import "../style/css/Login.css"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"

function Login() {
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("") 
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleSignOutClick = () => {
    navigate("/Register")
  };

  const handleSubmit = async (e) => {
    setUsernameError(false);
    setPasswordError(false);
    
    if (!username) {
    //   toast.error("Username is required");
      setUsernameError(true);
      e.preventDefault();
      return;
    }
    if (!password) {
    //   toast.error("Password is required");
      setPasswordError(true);
      e.preventDefault();
      return;
    }
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post(`http://${window.location.hostname}:8000/api/token/`, {username, password});
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
    } catch (error) {
    //   toast.error("Username or Password incorrect. Please try again.");
      // setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e); // Appel de handleSubmit
    }
  };

  return (
      <div>
          <div className="blockl_all">
            <div className="block">
              <h1 className="create">Login</h1>
              <div className="container">
                <div className="high">
                  <div className="pair">
                    <input
                      className={`username ${usernameError ? 'input-error' : ''}`}
                      type="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your username"
                    ></input>
                  </div>
                  <div className="pair">
                    <input
                      className={`password ${passwordError ? 'input-error' : ''}`}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your password"
                    ></input>
                  </div>
                </div>
                <div className="low">
                  <h4>
                    <button className="login" onClick={handleSubmit}>
                      <h4>Login</h4>
                    </button>
                  </h4>
                  {error && <p className="error-message">{error}</p>}
                  {/* {loading && <LoadingIndicator />} */}
                  <div className="too_low">
                    <div className="sign">
                      <h4>Don't have an account?</h4>
                    </div>
                    <h4>
                    <button onClick={handleSignOutClick}>Sign up</button>
                  </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  );
}

export default Login;
