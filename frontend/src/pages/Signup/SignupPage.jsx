import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";
import './signup.css'

import { Card, Form, Button } from 'react-bootstrap';


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
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className="shadow-lg" style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="m-4 text-center">Sign up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="signupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={Username}
                placeholder="Enter username"
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
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
            Already have an account <a href="/login" className="">Login</a>
          </p>
        </Card.Body>
      </Card>
    </div>
     {/* <div className="signup-page">
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
      </div> */}
  

    </>
  );
}
