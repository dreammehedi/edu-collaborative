import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/main_layout/MainLayout";
import Home from "../pages/home/Home";
import Error from "../pages/home/error/Error";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
