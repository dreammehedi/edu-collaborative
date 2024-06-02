import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Button from "../button/Button";
import Logo from "./Logo";

function Header() {
  // user info
  const { user, userSignOut } = useAuth();
  
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
      <header className="w-full h-[80px] flex items-center py-2 bg-slate-100">
        <nav className="container flex justify-between items-center">
          {/* logo */}
          <Logo></Logo>

          <div className="flex justify-between items-center gap-4">
            {user ? (
              <>
                <div className="cursor-pointer relative group">
                  <img
                    className="rounded-full size-14 object-cover "
                    src={user?.photoURL}
                    alt="userPhoto"
                  />
                  <div className="hidden group-hover:inline-block absolute bottom-[-80px] right-0 z-10 bg-white text-black rounded-md shadow-sm p-4">
                    <span className="font-bold font-roboto text-primary">
                      {user?.displayName}
                    </span>
                    <h2 className="font-medium text-sm text-primary-main">
                      {user?.email}
                    </h2>
                  </div>
                </div>
                <div onClick={handleLogout}>
                  <Button name={"Logout"}></Button>
                </div>
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
