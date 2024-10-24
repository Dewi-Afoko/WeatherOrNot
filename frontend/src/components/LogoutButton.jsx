import { useNavigate } from "react-router-dom";
import './logoutbutton.css'
import { useState } from "react";


function LogoutButton() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  function logOut() {
    setShowPopup(true);

    
    setTimeout(() => {
      localStorage.removeItem('username');
      localStorage.removeItem("token");
      navigate("/");
    }, 5000); 
  }

  return (
    <>
      <button className="logout-button" onClick={logOut}>Log out</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXgyYTF2YmticnJlbWVpbzFjams3anZwejk5cTA4N2FsZ3l4MHUyaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3fzGoKeNMU5e4t5S/giphy.webp'} alt="Logging out..." />
            <p>Logging out...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoutButton;
