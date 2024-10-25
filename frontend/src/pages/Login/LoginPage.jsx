import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authentication";
import './loginpage.css'

import { Card, Form, Button } from 'react-bootstrap';

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

  useEffect(() => {
    localStorage.clear()}, [])
  
  return (
    
    <>
<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className="shadow-lg" style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="m-4 text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={Password}
                onChange={handlePasswordChange}
                aria-describedby="passwordHelpBlock"
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                role="submit-button"
                id="submit"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
          <p className="m-4 text-muted text-center">
            Don't have an account? <a href="/signup" className="">Sign up</a>
          </p>
        </Card.Body>
      </Card>
    </div>


      {/* <div className="login-page">
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
      </div> */}

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

  
  
  

