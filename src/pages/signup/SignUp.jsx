import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Logo from "../../shared/header/Logo";
import SocialButton from "../../shared/social_button/SocialButton";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  // user info
  const { user, createNewUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

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
          const userAllInfo = {
            name,
            photo,
            email,
            role: data.role,
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
        <div className="container  grid grid-cols-1 lg:grid-cols-2 gap-8  lg:gap-12 items-center">
          <div className="space-y-3">
            <h2 className="font-bold text-3xl relative text-primary">
              Sign Up to your{" "}
              <span className="font-normal text-black">Account</span>
            </h2>
            <p className="text-sm">
              {`Already have an account?  `}
              <Link to={"/login"} className="underline text-primary">
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
                  className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
                />
                {errors.name && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    Name is required!
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
                  className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
                />
                {errors.photo && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    Photo is required!
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
                  className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
                />
                {errors.email && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    Email is required!
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label font-bold">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/,
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
                  />
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="cursor-pointer my-transiton hover:text-primary absolute top-1/2 right-4 -translate-y-1/2 "
                  >
                    {showPassword ? (
                      <FaEyeSlash className="my-transiton"></FaEyeSlash>
                    ) : (
                      <FaEye className="my-transiton"></FaEye>
                    )}
                  </div>
                </div>
                {errors.password?.type === "required" && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    Password is required!
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    Password must be 6 character long!
                  </span>
                )}

                {errors.password?.type === "maxLength" && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    Password must be less than 20 character!
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    Password must have one uppercase one lower case and one
                    special character.
                  </span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label font-bold">
                  <span className="label-text">Role</span>
                </label>
                <select
                  {...register("role", { required: true })}
                  id="role"
                  name="role"
                  className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                </select>

                {errors.role && (
                  <span className="text-xs mt-2 font-bold text-red-500">
                    Role is required!
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
          <div className="hidden lg:inline-block relative rounded-md overflow-hidden w-full max-h-[600px]">
            <img
              className="w-full h-full object-cover"
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
