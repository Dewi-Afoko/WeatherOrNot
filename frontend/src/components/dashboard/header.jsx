// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AnimatedHeadline from "./title";
// import './header.css';
import { CreateWorkout } from "../workout/CreateWorkout";
// const Header = () => {
 
//     const [showPopup, setShowPopup] = useState(false); 
//     const navigate = useNavigate(); 

    

//     // Function to log out
//     // function logOut() {
//     //     setShowPopup(true);
//     //     setTimeout(() => {
//     //         localStorage.removeItem('username');
//     //         localStorage.removeItem("token");
//     //         navigate("/");
//     //     }, 5000);
//     // }

//     return (
//         <>
//             <header className="app-header">
//                 {/* <div className="nav_logo">
//                     <AnimatedHeadline/>
//                 </div> */}

//                 <nav className="app-nav">
                    
//                     <ul >
//                         <li>
//                             <CreateWorkout/>
//                         </li>
//                         <li>
//                             <Link to="/user" className="nav-menu-list">My Profile</Link>
//                         </li>
//                         <li>
//                             <Link to="/generate_exercises" className="nav-menu-list">Get Exercises</Link>
//                         </li>
//                         <li>
//                             <Link to="/workouts" className="nav-menu-list">My Workouts</Link>
//                         </li>
//                         {/* <li>
//                             <span className="nav-menu-list" onClick={logOut} style={{ cursor: "pointer" }}>Log Out</span>
//                         </li> */}
//                     </ul>
//                 </nav>
//             </header>

//             {/* {showPopup && (
//                 <div className="popup-overlay">
//                     <div className="popup-content">
//                         <img
//                             src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXgyYTF2YmticnJlbWVpbzFjams3anZwejk5cTA4N2FsZ3l4MHUyaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3fzGoKeNMU5e4t5S/giphy.webp"
//                             alt="Logging out..."
//                         />
//                         <p>Logging out...</p>
//                     </div>
//                 </div>
//             )} */}
//         </>
//     );
// };

// export default Header;


// header.jsx
// header.jsx
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap"; // Importing Bootstrap components
import './header.css'; // Optional if you're adding additional styles

const Header = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top" className="px-4">
      <Navbar.Brand as={NavLink} to="/user">
        WeatherOrNot
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">

        <CreateWorkout/>
        
          <Nav.Link as={NavLink} to="/generate_exercises" activeClassName="active-link">
            Workout Generator
          </Nav.Link>
          <Nav.Link as={NavLink} to="/workouts" activeClassName="active-link">
            My Workouts
          </Nav.Link>
          <Nav.Link as={NavLink} to="/user" activeClassName="active-link">
            My Profile
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login" activeClassName="active-link">
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;


