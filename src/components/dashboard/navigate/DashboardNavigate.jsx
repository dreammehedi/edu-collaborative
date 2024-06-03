import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiMaterialsScience } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { MdDashboardCustomize } from "react-icons/md";
import { SiSession } from "react-icons/si";
import { TbUsersGroup } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";

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

        {/* admin navigate */}
        <ul className="pt-10 text-slate-500 font-medium font-roboto space-y-3 border-b border-slate-200 pb-2">
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
            <TbUsersGroup></TbUsersGroup>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary-main" : ""
              }
              to={"all-users"}
            >
              View All Users
            </NavLink>
          </li>{" "}
          <li className="flex items-center gap-2">
            <SiSession></SiSession>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary-main" : ""
              }
              to={"all-study-session"}
            >
              View All Study Session
            </NavLink>
          </li>{" "}
          <li className="flex items-center gap-2">
            <GiMaterialsScience></GiMaterialsScience>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary-main" : ""
              }
              to={"all-materials"}
            >
              View All Materials
            </NavLink>
          </li>
        </ul>

        {/* main navigate */}
        <ul className="pt-10 text-slate-500 font-medium font-roboto space-y-3">
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
