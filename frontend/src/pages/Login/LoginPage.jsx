import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../../components/BackgroundAnimation";
import { login } from "../../services/authentication";
import './loginpage.css'
export function LoginPage() {
  const [username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const[error,setError]= useState("")
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(username, Password);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setShowPopup(true)
      setTimeout(()=>{
        navigate("/user");},4000)
    } catch (err) {
      setError(alert(err.message))
      console.error(err);
      navigate("/login");
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  return (
    <>
      <div id="background">
        <BackgroundAnimation />
      </div>

      <div className="login-page">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              placeholder="Username"
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor="Password">Password:</label>
            <input
              placeholder="Password"
              id="Password"
              type="password"
              value={Password}
              onChange={handlePasswordChange}
            />
            <input role="submit-button" id="submit" type="submit" value="Submit" />
          </form>
          {error && <div className="error">{error}</div>}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={'https://i.giphy.com/3orieKRjkyDUti23sY.webp'} alt="Logging out..." />
            <p>Logging in...</p>
          </div>
        </div>
      )}
    </>
  );
}

  
  
  

