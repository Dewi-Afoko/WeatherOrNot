import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { UserPage } from "./pages/User/UserPage";
import { GenerateExercises } from "./pages/GenerateExercises/GenerateExercises";
// import { CreateWorkout } from "./components/CreateWorkout";
import { Workouts } from "./pages/Workouts/Workouts";
import ExerciseDetails from "./components/ExerciseDetails";

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
