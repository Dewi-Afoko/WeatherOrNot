import { useNavigate } from "react-router-dom";
import './logoutbutton.css'
function LogoutButton() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  }

  return <button className="logout-button" onClick={logOut}>Log out</button>;
}

export default LogoutButton;
