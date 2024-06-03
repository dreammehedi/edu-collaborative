import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { MdDashboardCustomize } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";
import AdminNavigate from "./AdminNavigate";
import StudentNavigate from "./StudentNavigate";
import TutorNavigate from "./TutorNavigate";

function DashboardNavigate() {
  // user info
  const { user } = useAuth();

  // user info
  const { userSignOut } = useAuth();

  // handle logout
  const handleLogout = () => {
    userSignOut()
      .then(() => {
        toast.success("User Logout!");
      })
      .catch(() => {
        toast.error("An error occurred!");
      });
  };

  const isUserRole = "tutor";

  return (
    <>
      <div className="p-4 shadow-md h-fit sticky top-[118px]">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <Link to={"/"}>
            <div className=" flex items-center gap-2">
              <img
                src={logo}
                alt="logo"
                className="w-[30px] h-auto object-cover"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold text-primary">
                  EduCollaborate
                </span>
                <span className="capitalize text-xs font-medium text-primary-main">
                  Education & Courses
                </span>
              </div>
            </div>
          </Link>
          <img
            src={user?.photoURL}
            alt="user"
            className="w-[40px] rounded-full h-auto object-cover"
          />
        </div>
        <h3 className="pt-4 text-right font-semibold">
          You are{" "}
          <span className="text-primary font-bold capitalize">
            {isUserRole}
          </span>
        </h3>
        {/* admin navigate */}
        {isUserRole === "admin" && <AdminNavigate></AdminNavigate>}

        {/* student navigate */}
        {isUserRole === "student" && <StudentNavigate></StudentNavigate>}

        {/* tutor navigate */}
        {isUserRole === "tutor" && <TutorNavigate></TutorNavigate>}
        {/* main navigate */}
        <ul className="pt-10 text-slate-500 font-medium font-roboto space-y-3">
          <li className="flex items-center gap-2">
            <MdDashboardCustomize></MdDashboardCustomize>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary-main" : ""
              }
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="flex items-center gap-2">
            <FaHome></FaHome>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary-main" : ""
              }
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li className="flex items-center gap-2">
            <ImProfile></ImProfile>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary-main" : ""
              }
              to={"user-profile"}
            >
              Profile
            </NavLink>
          </li>
          <li className="flex items-center gap-2">
            <FiLogOut></FiLogOut>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default DashboardNavigate;
