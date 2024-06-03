import { createBrowserRouter } from "react-router-dom";
import AllMaterials from "../dashboard/admin/AllMaterials";
import AllStudySession from "../dashboard/admin/AllStudySession";
import AllUsers from "../dashboard/admin/AllUsers";
import Profile from "../dashboard/user_profile/Profile";
import Dashboard from "../layout/dashboard/Dashboard";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import MainLayout from "../layout/main_layout/MainLayout";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import PrivateRoute from "../private/PrivateRoute";
import StudySessionDetailes from "./../components/home/study_session/study_session_detailes/StudySessionDetailes";
import CreateNote from "./../dashboard/student/CreateNote";
import ManagePersonalNotes from "./../dashboard/student/ManagePersonalNotes";
import ViewAllStudyMaterial from "./../dashboard/student/ViewAllStudyMaterial";
import ViewBookedSession from "./../dashboard/student/ViewBookedSession";
import CreateStudySession from "./../dashboard/tutor/CreateStudySession";
import UploadMaterials from "./../dashboard/tutor/UploadMaterials";
import ViewAllMaterials from "./../dashboard/tutor/ViewAllMaterials";
import ViewAllNotes from "./../dashboard/tutor/ViewAllNotes";
import ViewAllStudySession from "./../dashboard/tutor/ViewAllStudySession";
import Payment from "./../payment/Payment";

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
      {
        path: "/payment",
        element: <Payment></Payment>,
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
        element: <Profile></Profile>,
      },
      {
        path: "view-booked-session",
        element: <ViewBookedSession></ViewBookedSession>,
      },
      {
        path: "create-note",
        element: <CreateNote></CreateNote>,
      },
      {
        path: "manage-personal-notes",
        element: <ManagePersonalNotes></ManagePersonalNotes>,
      },
      {
        path: "view-all-study-materials",
        element: <ViewAllStudyMaterial></ViewAllStudyMaterial>,
      },
      {
        path: "create-study-session",
        element: <CreateStudySession></CreateStudySession>,
      },
      {
        path: "view-all-study-session",
        element: <ViewAllStudySession></ViewAllStudySession>,
      },
      {
        path: "upload-materials",
        element: <UploadMaterials></UploadMaterials>,
      },
      {
        path: "view-all-materials",
        element: <ViewAllMaterials></ViewAllMaterials>,
      },
      {
        path: "view-all-notes",
        element: <ViewAllNotes></ViewAllNotes>,
      },
    ],
  },
]);

export default router;
