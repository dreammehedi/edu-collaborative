import { Link } from "react-router-dom";
import Button from "../button/Button";
import Logo from "./Logo";
import MenuContent from "./MenuContent";

function Header() {
  return (
    <>
      <header className="w-full h-auto py-2 ">
        <nav className="container flex justify-between items-center">
          {/* logo */}
          <Logo></Logo>

          {/* desktop menu */}
          <ul className="flex justify-center items-center gap-6 font-medium font-roboto text-black">
            <MenuContent></MenuContent>
          </ul>

          <div className="flex justify-between gap-4">
            <Link to={"/signup"}>
              <Button name={"Sign Up"}></Button>
            </Link>
            <Link to={"/login"}>
              <Button name={"Login"}></Button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
