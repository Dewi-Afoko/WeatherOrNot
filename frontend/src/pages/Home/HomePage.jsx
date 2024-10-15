import { Link } from "react-router-dom";

import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home">
      <h1>Weather Or Not!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
}
