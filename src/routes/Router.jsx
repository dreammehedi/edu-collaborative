import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/main_layout/MainLayout";
import Home from "../pages/home/Home";
import Error from "../pages/home/error/Error";

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
]);

export default router;
