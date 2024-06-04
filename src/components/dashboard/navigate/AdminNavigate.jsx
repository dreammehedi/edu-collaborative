import { GiMaterialsScience } from "react-icons/gi";
import { SiSession } from "react-icons/si";
import { TbUsersGroup } from "react-icons/tb";
import { NavLink } from "react-router-dom";

function AdminNavigate() {
  return (
    <>
      <ul className="pt-10 text-slate-500 font-medium font-roboto space-y-3 border-b border-slate-200 pb-2">
        <li className="flex items-center gap-2">
          <TbUsersGroup></TbUsersGroup>
          <NavLink
            className={({ isActive }) => (isActive ? "text-primary-main" : "")}
            to={"all-users"}
          >
            View All Users
          </NavLink>
        </li>{" "}
        <li className="flex items-center gap-2">
          <SiSession></SiSession>
          <NavLink
            className={({ isActive }) => (isActive ? "text-primary-main" : "")}
            to={"all-study-session"}
          >
            View All Study Session
          </NavLink>
        </li>{" "}
        <li className="flex items-center gap-2">
          <GiMaterialsScience></GiMaterialsScience>
          <NavLink
            className={({ isActive }) => (isActive ? "text-primary-main" : "")}
            to={"all-materials"}
          >
            View All Materials
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default AdminNavigate;
