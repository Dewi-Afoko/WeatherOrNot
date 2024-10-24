import { Link } from "react-router-dom";
import RotatingText from "./title3";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home">
      <h6>Weather Or Not!</h6>
      <RotatingText/>
      <Link to="/signup" className="button">Sign Up</Link>
      <Link to="/login" className="button">Log In</Link>
    </div>
  );
}
