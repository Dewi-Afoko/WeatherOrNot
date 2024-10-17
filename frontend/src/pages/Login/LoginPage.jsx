import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../../components/BackgroundAnimation";
import { login } from "../../services/authentication";
import './loginpage.css'
export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError]= useState("")
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      navigate("/user");
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
      <div className="login-page">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <input role="submit-button" id="submit" type="submit" value="Submit" />
          </form>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
  
      <div id="background">
        <BackgroundAnimation />
      </div>
    </>
  );
  
}
