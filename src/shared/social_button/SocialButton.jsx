import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

function SocialButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // user info
  const { loginWithGoogle, loginWithFacebook } = useAuth();

  // handle facebook
  const handleFacebook = () => {
    loginWithFacebook()
      .then(() => {
        toast.success("User Login successfully!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("An error occurred!");
      });
  };

  // handle google
  const handleGoogle = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("User Login successfully!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("An error occurred!");
      });
  };

  return (
    <>
      <button
        onClick={handleFacebook}
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#4B69A8] px-6 font-medium text-neutral-200"
      >
        <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
          <FaFacebook></FaFacebook>
        </div>
        <span className="text-xl">Facebook</span>
      </button>
      <button
        onClick={handleGoogle}
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#FE6E63] px-6 font-medium text-neutral-200"
      >
        <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
          <FcGoogle className="text-xl"></FcGoogle>
        </div>
        <span>Google</span>
      </button>
    </>
  );
}

export default SocialButton;
