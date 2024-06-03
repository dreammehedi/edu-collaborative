import { createBrowserRouter } from "react-router-dom";
import AllMaterials from "../dashboard/all_materials/AllMaterials";
import AllStudySession from "../dashboard/all_study_session/AllStudySession";
import AllUsers from "../dashboard/all_users/AllUsers";
import Dashboard from "../layout/dashboard/Dashboard";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import MainLayout from "../layout/main_layout/MainLayout";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import PrivateRoute from "../private/PrivateRoute";
import UserProfile from "../shared/user_profile/UserProfile";
import StudySessionDetailes from "./../components/home/study_session/study_session_detailes/StudySessionDetailes";

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
      {
        path: "/study-session-detailes/:id",
        element: (
          <PrivateRoute>
            <StudySessionDetailes></StudySessionDetailes>
          </PrivateRoute>
        ),
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "all-study-session",
        element: <AllStudySession></AllStudySession>,
      },
      {
        path: "all-materials",
        element: <AllMaterials></AllMaterials>,
      },
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
    ],
  },
]);

export default router;
