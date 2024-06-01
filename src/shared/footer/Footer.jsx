import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Button from "../button/Button";
import Logo from "../header/Logo";

function Footer() {
  return (
    <>
      <footer className="bg-slate-100">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl ">
                Subscribe our newsletter to get update.
              </h1>

              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <input
                  id="email"
                  type="text"
                  className="px-4 py-2 text-gray-700 bg-white border rounded-md  focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Email Address"
                />

                <div className="ml-2">
                  <Button name={"Subscribe"}></Button>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 ">Quick Link</p>

              <div className="flex flex-col items-start mt-5 space-y-2 font-medium">
                <NavLink to={"/"} className="text-gray-600">
                  Home
                </NavLink>
                <NavLink to={"/about-us"} className="text-gray-600">
                  About Us
                </NavLink>
                <NavLink to={"/contact-us"} className="text-gray-600">
                  Contact Us
                </NavLink>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 ">Courses</p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <NavLink to={"/courses"} className="text-gray-600">
                  Courses
                </NavLink>

                <NavLink to={"/membership"} className="text-gray-600">
                  Detailes
                </NavLink>
                <NavLink to={"/membership"} className="text-gray-600">
                  Membership
                </NavLink>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-8" />

          <div className="flex items-center justify-between">
            <Link to={"/"}>
              <Logo></Logo>
            </Link>

            <div className="flex -mx-2 justify-between gap-4 text-xl">
              <a
                href={"https://www.facebook.com/profile.php?id=61554869056271"}
                target="_blank"
              >
                <FaFacebookF></FaFacebookF>
              </a>
              <a
                href={"https://www.linkedin.com/in/mehedi-hassan-miraj/"}
                target="_blank"
              >
                <FaLinkedinIn></FaLinkedinIn>
              </a>
              <a href={"https://github.com/dreammehedi"} target="_blank">
                <FaGithub></FaGithub>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
