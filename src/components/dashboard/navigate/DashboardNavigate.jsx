import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { MdDashboardCustomize } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.png";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import useStudent from "../../../hooks/useStudent";
import useTutor from "../../../hooks/useTutor";
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

  const [isAdmin] = useAdmin();
  const [isStudent] = useStudent();
  const [isTutor] = useTutor();

  return (
    <>
      <div className="p-4 shadow-md w-full h-fit sticky top-[118px] rounded-md">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <Link to={"/"}>
            <div className="flex flex-wrap items-center gap-1 lg:gap-2">
              <img
                src={logo}
                alt="logo"
                className="w-[20px] lg:w-[30px] h-auto object-cover"
              />
              <div className="flex flex-col">
                <span className="text-[14px] lg:text-base font-bold text-primary">
                  EduCollaborate
                </span>
                <span className="capitalize text-[10px] lg:ext-xs font-medium text-primary-main">
                  Education & Courses
                </span>
              </div>
            </div>
          </Link>
          <img
            src={user?.photoURL}
            alt="user"
            className="size-[40px] rounded-full  object-cover  ring-2 ring-primary-main/50 shadow-md"
          />
        </div>
        <h3 className="pt-4 text-right font-semibold">
          You are
          <span className="text-primary font-bold capitalize">
            {" "}
            {isAdmin && "Admin"}
            {isStudent && "Student"}
            {isTutor && "Tutor"}
          </span>
        </h3>
        {/* admin navigate */}
        {isAdmin && <AdminNavigate></AdminNavigate>}

        {/* student navigate */}
        {isStudent && <StudentNavigate></StudentNavigate>}

        {/* tutor navigate */}
        {isTutor && <TutorNavigate></TutorNavigate>}
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
