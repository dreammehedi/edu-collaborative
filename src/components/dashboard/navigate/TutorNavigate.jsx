import { IoCreate } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { SiMaterialformkdocs, SiSession } from "react-icons/si";
import { NavLink } from "react-router-dom";

function TutorNavigate() {
  return (
    <>
      <ul className="pt-10 text-slate-500 font-medium font-roboto space-y-3 border-b border-slate-200 pb-2">
        <li className="flex items-center gap-2">
          <IoCreate></IoCreate>
          <NavLink
            className={({ isActive }) => (isActive ? "text-primary-main" : "")}
            to={"create-study-session"}
          >
            Create Study Session
          </NavLink>
        </li>
        <li className="flex items-center gap-2">
          <SiSession></SiSession>
          <NavLink
            className={({ isActive }) => (isActive ? "text-primary-main" : "")}
            to={"view-all-study-session"}
          >
            View All Study Session
          </NavLink>
        </li>
        <li className="flex items-center gap-2">
          <MdCreateNewFolder></MdCreateNewFolder>
          <NavLink
            className={({ isActive }) => (isActive ? "text-primary-main" : "")}
            to={"upload-materials"}
          >
            Upload Materials
          </NavLink>
        </li>
        <li className="flex items-center gap-2">
          <SiMaterialformkdocs></SiMaterialformkdocs>
          <NavLink
            className={({ isActive }) => (isActive ? "text-primary-main" : "")}
            to={"view-all-materials"}
          >
            View All Materials
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default TutorNavigate;
