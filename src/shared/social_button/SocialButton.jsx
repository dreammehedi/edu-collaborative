import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function SocialButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || "/";

  // user info
  const { loginWithGoogle, loginWithFacebook } = useAuth();

  // handle facebook
  const handleFacebook = () => {
    loginWithFacebook()
      .then((userData) => {
        const userAllInfo = {
          name: userData?.user.displayName,
          photo: userData?.user.photoURL,
          email: userData?.user.email,
          role: "student",
        };

        // user data store in database
        axiosPublic.post("/users", userAllInfo).then((res) => {
          const data = res.data;
          if (data.insertedData) {
            Swal.fire({
              title: "User Created Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          }
        });
      })
      .catch(() => {
        toast.error("An error occurred!");
      });
  };

  // handle google
  const handleGoogle = () => {
    loginWithGoogle()
      .then((userData) => {
        const userAllInfo = {
          name: userData?.user.displayName,
          photo: userData?.user.photoURL,
          email: userData?.user.email,
          role: "student",
        };

        // user data store in database
        axiosPublic.post("/users", userAllInfo).then((res) => {
          const data = res.data;
          if (data.insertedData) {
            Swal.fire({
              title: "User Created Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          }
        });
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
