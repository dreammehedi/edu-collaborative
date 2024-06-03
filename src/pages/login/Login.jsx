import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import Logo from "../../shared/header/Logo";
import SocialButton from "../../shared/social_button/SocialButton";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { user, loginWithEmailAndPassword } = useAuth();
  // handle login
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    loginWithEmailAndPassword(email, password)
      .then(() => {
        toast.success("User Login successfully!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("An error occurred!");
      });
  };

  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <>
      <Helmet>
        <title>EduCollaborate | Login</title>
      </Helmet>
      <section className="py-12 bg-slate-100 w-full min-h-screen flex justify-center items-center">
        <div className="container  grid grid-cols-2 gap-12">
          <div className="relative rounded-md overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/group-positive-young-people-working-together_23-2148431342.jpg?t=st=1717230351~exp=1717233951~hmac=500a36191d004510f44e2674c9d094d7ecf4f1be0c4c7e552a4326d19918d22a&w=740"
              alt=""
            />
            <div className="w-full h-full flex justify-center items-center bg-black/70  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Logo></Logo>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="font-bold text-3xl relative">
              Login to your <span className="font-normal">Account</span>
            </h2>
            <p className="text-sm">
              {`Don't have an account?  `}
              <Link to={"/signup"} className="underline">
                Create one here
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label font-bold">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Your email"
                  className="input border-0 border-b border-primary !outline-none"
                />
                {errors.email && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    This field is required!
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label font-bold">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Your password"
                  className="input border-0 border-b border-primary !outline-none"
                />
                {errors.password && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    This field is required!
                  </span>
                )}
              </div>
              <input
                className="rounded-md bg-primary px-8 py-3 cursor-pointer text-neutral-50"
                type="submit"
                value={"Login"}
              />
            </form>
            <div className="pt-6 space-y-2">
              <p className="text-sm font-semibold">Login with social Media</p>
              <div className="space-x-4">
                <SocialButton></SocialButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
