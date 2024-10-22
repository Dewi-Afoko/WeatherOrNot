import { Link } from "react-router-dom";
import RotatingText from "./title";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home">
      <h1>Weather Or Not!</h1>
      <RotatingText/>
      <Link to="/signup" className="button">Sign Up</Link>
      <Link to="/login" className="button">Log In</Link>
    </div>
  );
}
