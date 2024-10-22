import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { UserPage } from "./pages/User/UserPage";
import { GenerateExercises } from "./pages/GenerateExercises/GenerateExercises";

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
    path: "/addFavourite",
    element: <GenerateExercises />,
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
