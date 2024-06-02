import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Logo from "../../shared/header/Logo";
import SocialButton from "../../shared/social_button/SocialButton";

function SignUp() {
  // user info
  const { user, createNewUser, updateUserProfile } = useAuth();

  const navigate = useNavigate();

  // handle sign up
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const name = data.name;
    const photo = data.photo;
    const email = data.email;
    const password = data.password;
    createNewUser(email, password).then(() => {
      updateUserProfile(name, photo)
        .then(() => {
          toast.success("User Login successfully!");
          navigate("/");
        })
        .catch(() => {
          toast.error("An error occurred!");
        });
    });
  };

  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <>
      <Helmet>
        <title>EduCollaboration | Sign Up</title>
      </Helmet>
      <section className="py-12 bg-slate-100 w-full h-auto flex justify-center items-center">
        <div className="container  grid grid-cols-2 gap-12">
          <div className="space-y-3">
            <h2 className="font-bold text-3xl relative">
              Sign Up to your <span className="font-normal">Account</span>
            </h2>
            <p className="text-sm">
              {`Already have an account?  `}
              <Link to={"/login"} className="underline">
                Login
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label font-bold">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Your Name"
                  className="input border-0 border-b border-primary !outline-none"
                />
                {errors.name && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    This field is required!
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label font-bold">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  {...register("photo", { required: true })}
                  type="text"
                  placeholder="Your photo"
                  className="input border-0 border-b border-primary !outline-none"
                />
                {errors.photo && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    This field is required!
                  </span>
                )}
              </div>
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
              <div className="form-control">
                <label className="label font-bold">
                  <span className="label-text">Role</span>
                </label>
                <select
                  {...register("role", { required: true })}
                  id="role"
                  name="role"
                  className="input border-0 border-b border-primary !outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Administrator</option>
                </select>

                {errors.role && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    This field is required!
                  </span>
                )}
              </div>
              <input
                className="rounded-md bg-primary px-8 py-3 cursor-pointer text-neutral-50"
                type="submit"
                value={"Sign Up"}
              />
            </form>
            <div className="pt-6 space-y-2">
              <p className="text-sm font-semibold">Sign Up with social Media</p>
              <div className="space-x-4">
                <SocialButton></SocialButton>
              </div>
            </div>
          </div>
          <div className="relative rounded-md overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/start-up-designers_1098-14229.jpg?t=st=1717235896~exp=1717239496~hmac=2e723870f597acf57e0517f56c92745c5626aa5f9045821672c6752bbc887104&w=740"
              alt=""
            />
            <div className="w-full h-full flex justify-center items-center bg-black/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Logo></Logo>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
