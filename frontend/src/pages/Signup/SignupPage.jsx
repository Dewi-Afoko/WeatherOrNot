import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";
import './signup.css'
export function SignupPage() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signup(Username, password);
      navigate("/login");
    } catch (err) {
      setError(alert(err.message))
      console.error(err);
      navigate("/signup");
      setUsername('')
      setPassword('')
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
     <div className="signup-page">
     <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Username">Username:</label>
        <input
        placeholder="Username"
          id="Username"
          type="text"
          value={Username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      {error && <div>
        {error}</div>}
        </div>
      </div>
  

    </>
  );
}
