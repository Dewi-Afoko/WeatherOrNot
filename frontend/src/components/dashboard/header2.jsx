// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AnimatedHeadline from "./title";
// import './header.css';
// import { CreateWorkout } from "../workout/CreateWorkout";

// export function Header() {

//     const [showPopup, setShowPopup] = useState(false); 
//     const navigate = useNavigate(); 

//     return (
//         <>
//             <header className="app-header">
//                 <div className="nav_logo">
//                     <AnimatedHeadline/>
//                 </div>

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
//                         <li>
//                             <span className="nav-menu-list" onClick={logOut} style={{ cursor: "pointer" }}>Log Out</span>
//                         </li>
//                     </ul>
//                 </nav>
//             </header>

//             {showPopup && (
//                 <div className="popup-overlay">
//                     <div className="popup-content">
//                         <img
//                             src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXgyYTF2YmticnJlbWVpbzFjams3anZwejk5cTA4N2FsZ3l4MHUyaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3fzGoKeNMU5e4t5S/giphy.webp"
//                             alt="Logging out..."
//                         />
//                         <p>Logging out...</p>
//                     </div>
//                 </div>
//             )}
//         </>
//     );

// };

