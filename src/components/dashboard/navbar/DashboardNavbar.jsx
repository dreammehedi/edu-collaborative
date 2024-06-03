import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";
import Button from "../../../shared/button/Button";

function DashboardNavbar() {
  // user info
  const { user } = useAuth();
  return (
    <>
      <nav className="bg-primary/95 py-2 sticky top-0 left-0 w-full z-[999]">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to={"/"}>
              <div className="flex items-center justify-center gap-2">
                <img
                  src={logo}
                  alt="logo"
                  className="w-[50px] h-auto object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">
                    EduCollaborate
                  </span>
                  <span className="capitalize text-sm font-medium text-primary-main">
                    Education & Courses
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex justify-center items-center gap-3">
            <img
              src={user?.photoURL}
              alt="user"
              className="w-[50px] rounded-full h-auto object-cover"
            />
            <Link to={"/"}>
              <Button name={"Home"}>
                <FaHome className="z-10"></FaHome>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default DashboardNavbar;
