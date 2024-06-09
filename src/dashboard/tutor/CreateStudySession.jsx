import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../shared/section_title/SectionTitle";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function CreateStudySession() {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  // handle create study session
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // user info
  const { user } = useAuth();

  const [startTime, setStartTime] = useState(moment("00:00 PM", "hh:mm A")); // Initial start time
  const [endTime, setEndTime] = useState(moment("00:00 PM", "hh:mm A")); // Initial end time
  const [formattedDuration, setFormattedDuration] = useState(
    "0 hours and 0 minutes"
  );

  // image hosting key in imgbb
  const imageHostingApiKey = import.meta.env.VITE_HOSTING_API_KEY;
  const imageHostingApiUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

  // Update duration on component mount and state changes (startTime, endTime)
  useEffect(() => {
    const calculateDuration = () => {
      const duration = moment.duration(endTime.diff(startTime));
      const formatted =
        duration.hours() + " hours and " + duration.minutes() + " minutes";
      setFormattedDuration(formatted);
    };
    calculateDuration();
  }, [startTime, endTime]);

  const onSubmit = async (studySessionData) => {
    const { image, ...studySessionDataMain } = studySessionData;
    const sessionImgFile = { image: image[0] };
    const res = await axiosPublic.post(imageHostingApiUrl, sessionImgFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const resData = await res.data;
    if (resData.success) {
      const image = resData.data.display_url;
      const sessionDuration = formattedDuration;
      const createStudySessionData = {
        image,
        sessionDuration: sessionDuration,
        status: "pending",
        ...studySessionDataMain,
      };
      const res = await axiosSecure.post(
        "/create-study-session",
        createStudySessionData
      );
      const data = await res.data;
      if (data.insertedId) {
        reset();
        setFormattedDuration("0 hours and 0 minutes");
        Swal.fire({
          title: "Study Session Created Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "An error occurred!",
          icon: "error",
          showConfirmButton: false,
        });
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Dashboard | Create Study Session</title>
      </Helmet>
      <section className="space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"Create a"}
            secondName={"New Study Session"}
            description={
              "This intuitive tool allows you to design and share in-depth study sessions, creating valuable resources for your students and fellow tutors."
            }
          ></SectionTitle>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-md shadow-md p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-6 md:gap-8"
        >
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Session Title:
            </label>
            <input
              {...register("sessionTitle", { required: true })}
              type="text"
              placeholder="Session Title..."
              className="capitalize my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
            {errors.sessionTitle && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Session title is required!
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Tutor Name:
            </label>
            <input
              disabled
              {...register("tutorName", { value: user?.displayName })}
              type="text"
              placeholder="Tutor Name..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Tutor Email:
            </label>
            <input
              disabled
              {...register("tutorEmail", { value: user?.email })}
              type="email"
              placeholder="Tutor Email..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
          </div>{" "}
          <div className="space-y-1 md:col-span-2 lg:col-span-3">
            <label className=" font-roboto font-medium text-[15px]">
              Session Description:
            </label>
            <textarea
              rows={5}
              {...register("sessionDescription", { required: true })}
              placeholder="Session Description..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
            {errors.sessionDescription && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Session description is required!
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Session Image:
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              placeholder="Session Image..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
            {errors.image && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Session image is required!
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Registration Start Date:
            </label>
            <input
              {...register("registrationStartDate", { required: true })}
              type="date"
              placeholder="Registration Start Date..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
            {errors.registrationStartDate && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Registration start date is required!
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Registration End Date:
            </label>
            <input
              {...register("registrationEndDate", { required: true })}
              type="date"
              placeholder="Registration End Date..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
            {errors.registrationEndDate && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Registration end date is required!
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Class Start Time:
            </label>
            <input
              {...register("classStartTime", {
                required: true,
                onChange: (e) => {
                  setStartTime(moment(e.target.value, "HH:mm"));
                },
              })}
              type="time"
              placeholder="Class Start Time..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
            {errors.classStartTime && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Class start time is required!
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Class End Time:
            </label>
            <input
              {...register("classEndTime", {
                required: true,
                onChange: (e) => {
                  setEndTime(moment(e.target.value, "HH:mm"));
                },
              })}
              type="time"
              placeholder="Class End Time..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
            {errors.classEndTime && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Class end time is required!
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Session Duration:
            </label>
            <p className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary">
              {formattedDuration}
            </p>
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Registration Fee:
            </label>
            <input
              disabled
              defaultValue={0}
              {...register("fee", { value: 0 })}
              type="number"
              placeholder="Registration Fee..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Max Participant:
            </label>
            <input
              disabled
              defaultValue={0}
              {...register("maxParticipants", { value: 0 })}
              type="number"
              placeholder="Max Participant..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
          </div>
          <div className="lg:col-span-3 flex justify-center">
            <button className=" group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-primary px-8 py-2 text-neutral-50 flex justify-between items-center gap-2">
              <span className="relative z-10">Create Study Session</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-primary-main transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateStudySession;
