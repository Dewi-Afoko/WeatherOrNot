import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/dashboard/header";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { UserPage } from "./pages/User/UserPage";
import { GenerateExercises } from "./pages/GenerateExercises/GenerateExercises";

import { Workouts } from "./pages/Workouts/Workouts";

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide the header for the /login, /signup, and / paths
  const hideHeaderPaths = ["/login", "/signup", "/"];
  
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);


// import { CreateWorkout } from "./components/CreateWorkout";
import { Workouts } from "./pages/Workouts/Workouts";
import ExerciseDetails from "./components/ExerciseDetails";
import 'bootstrap/dist/css/bootstrap.min.css';

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/generate_exercises",
    element: <GenerateExercises />,
  },
  {
    path: "/workouts",
    element: <Workouts />,
  },
  {
    path: "/exercise",
    element: <ExerciseDetails />,
  },
]);


function App() {

  return (
    <>
      {!shouldHideHeader && <Header />} {/* Show header unless it's a restricted path */}
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/workouts" element={<Workouts/>}/>
          <Route path="/generate_exercises" element={<GenerateExercises />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
