import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmpasswordError, setConfirmPasswordError] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(true);
  const navigate = useNavigate();


  const handleSignInClick = () => {
    navigate("/Login")
  };

  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (!username) {
      // toast.error("Username is required");
      setUsernameError(true);
      e.preventDefault();
      return;
    }

    if (!email) {
      // toast.error("Email is required");
      setEmailError(true);
      e.preventDefault();
      return;
    }

    if (!password) {
      // toast.error("Password is required");
      setPasswordError(true);
      e.preventDefault();
      return;
    }

    if (!isStrongPassword(password)) {
      // toast.error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
      setPasswordError(true);
      e.preventDefault();
      return;
    }

    if (password !== confirmPassword) {
      // toast.error("Passwords do not match");
      setConfirmPasswordError(true);
      e.preventDefault();
      return;
    }

    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post(`http://${window.location.hostname}:8000/api/user/register/`, { username, password, email });
      // toast.success("Registration success!");
      setTimeout(() => {
        handleSignInClick();
      }, 1000);
      setUsername("");
      setPassword("");
      setEmail("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response) {
        if (error.response.data.username) {
          // toast.error("Username already exists");
          setUsernameError(true);
        } else if (!error.response.data.email) {
          // toast.error("Email already exists");
          setEmailError(true);
        }
      } else {
        // toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer l'événement de touche
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div>
        <div className="blockr_all">
          <div className="block">
            <h1 className="create">Register</h1>
            <div className="container">
              <div className="high">
                <div className="pair">
                  <input
                    className={`username ${usernameError ? 'input-error' : ''}`}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown} // Ajout de l'événement keyDown
                    placeholder="Enter your username"
                  />
                </div>
                <div className="pair">
                  <input
                    className={`email ${emailError ? 'input-error' : ''}`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown} // Ajout de l'événement keyDown
                    placeholder="Enter your email"
                  />
                </div>
                <div className="pair">
                  <input
                    className={`password ${passwordError ? 'input-error' : ''}`}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown} // Ajout de l'événement keyDown
                    placeholder="Enter your password"
                  />
                </div>
                <div className="pair">
                  <input
                    className={`password ${confirmpasswordError ? 'input-error' : ''}`}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={handleKeyDown} // Ajout de l'événement keyDown
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              <div className="low">
                <h4>
                  <button className="register" onClick={handleSubmit}>
                    <h4>Register</h4>
                  </button>
                </h4>
                {/* {loading && <LoadingIndicator />} */}
                <div className="too_low">
                  <h4>Already have an account?</h4>
                  <h4>
                    <button onClick={handleSignInClick}>Sign in</button>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* <ToastContainer /> */}
        </div>
    </div>
  );
}

export default Register;
