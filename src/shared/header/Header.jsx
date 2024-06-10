import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../button/Button";
import HandleLogout from "../handle_logout/HandleLogout";
import UserProfile from "../user_profile/UserProfile";
import Logo from "./Logo";

function Header() {
  const [toggleMenuActive, setToggleMenuActive] = useState(true);
  // user info
  const { user } = useAuth();
  return (
    <>
      <header className="sticky top-0 left-0 z-[99999] shadow-md w-full h-[80px] flex items-center py-2 bg-slate-100">
        <nav className="relative container flex justify-between items-center">
          {/* logo */}
          <Link to={"/"}>
            <Logo></Logo>
          </Link>

          {/* mobile toggle humberger */}
          <div
            onClick={() => {
              setToggleMenuActive(!toggleMenuActive);
            }}
            className="md:hidden cursor-pointer font-bold text-2xl bg-primary/50 p-2 rounded-md text-white"
          >
            {toggleMenuActive ? (
              <FaBarsStaggered></FaBarsStaggered>
            ) : (
              <IoMdClose></IoMdClose>
            )}
          </div>

          {/* mobile menu */}
          <div
            className={`${
              toggleMenuActive ? "-right-full" : "right-0"
            } md:hidden w-2/3 h-screen p-4 fixed  top-[78px] z-[999999] bg-slate-200 rounded-md shadow-md flex flex-col space-y-4 my-transition`}
          >
            {user ? (
              <>
                <UserProfile></UserProfile>
                <HandleLogout></HandleLogout>
                <Link to={"/dashboard"}>
                  <Button name={"Dashboard"}></Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button name={"Login"}></Button>
                </Link>
                <Link to={"/signup"}>
                  <Button name={"Sign Up"}></Button>
                </Link>
              </>
            )}
          </div>

          {/* tablet & desktop menu */}
          <div className="hidden md:flex justify-between items-center gap-4">
            {user ? (
              <>
                <UserProfile></UserProfile>
                <HandleLogout></HandleLogout>
                <Link to={"/dashboard"}>
                  <Button name={"Dashboard"}></Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/signup"}>
                  <Button name={"Sign Up"}></Button>
                </Link>
                <Link to={"/login"}>
                  <Button name={"Login"}></Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
