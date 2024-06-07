import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../button/Button";
import HandleLogout from "../handle_logout/HandleLogout";
import UserProfile from "../user_profile/UserProfile";
import Logo from "./Logo";

function Header() {
  // user info
  const { user } = useAuth();
  return (
    <>
      <header className="sticky top-0 left-0 z-[99999] shadow-md w-full h-[80px] flex items-center py-2 bg-slate-100">
        <nav className="container flex justify-between items-center">
          {/* logo */}
          <Link to={"/"}>
            <Logo></Logo>
          </Link>

          <div className="flex justify-between items-center gap-4">
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
