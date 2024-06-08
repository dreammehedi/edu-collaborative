import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";

function ViewBookedSessionDetailes() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    isPending,
    error,
    data: viewStudentBookedSessionDetailes,
  } = useQuery({
    queryKey: ["viewStudentBookedSessionDetailes"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/view-student-booked-session-detailes/${id}`
      );
      const data = await res.data;
      return data;
    },
  });
  const mainStudySessionId = viewStudentBookedSessionDetailes?.studySessionId;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const sessionData = {
      studentBookedSessionId: mainStudySessionId,
      studentImage: user.photoURL,
      ...data,
    };

    const res = await axiosSecure.post(
      "/view-student-booked-session-review-rating",
      sessionData
    );
    const resData = await res.data;
    if (resData.insertedId) {
      reset();
      Swal.fire({
        title: "Review and Rating Submitted Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "An error occurred!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Dashboard | View Booked Session Detailes</title>
      </Helmet>
      <section className="space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"View Your"}
            secondName={"Booked Study Session Detailes"}
            description={
              "Feeling overwhelmed by upcoming exams and projects? Juggling a busy schedule can make it tough to keep track of your booked study sessions. This guide is here to help! Designed specifically for students, it will show you how to easily view and manage all your booked study sessions, ensuring you stay on top of your academic commitments."
            }
          ></SectionTitle>
        </div>

        {isPending && (
          <div className="flex justify-center py-12 ">
            <DataLoader></DataLoader>
          </div>
        )}
        {error && (
          <div className="flex flex-col spacey-2 justify-center items-center">
            <ErrorDataImage></ErrorDataImage>
            <span className="text-red-500">
              An error has occurred: {error.message}
            </span>
          </div>
        )}

        {viewStudentBookedSessionDetailes && (
          <div className="space-y-4">
            <img
              className="w-full h-[400px] object-cover"
              src={viewStudentBookedSessionDetailes?.image}
              alt=""
            />
            <div className="space-y-2">
              <h2 className="text-primary text-2xl font-bold">
                {viewStudentBookedSessionDetailes?.sessionTitle}
              </h2>
              <p>{viewStudentBookedSessionDetailes?.sessionDescription}</p>
            </div>
            <div className="grid grid-cols-2 justify-between gap-4">
              <p className="font-medium text-primary">
                Student Name:{" "}
                <span className="text-black">
                  {viewStudentBookedSessionDetailes?.studentName}
                </span>
              </p>
              <p className="font-medium text-primary">
                Student Email:{" "}
                <span className="text-black break-words">
                  {viewStudentBookedSessionDetailes?.studentEmail}
                </span>
              </p>
              <p className="font-medium text-primary">
                Tutor Name:{" "}
                <span className="text-black">
                  {viewStudentBookedSessionDetailes?.tutorName}
                </span>
              </p>{" "}
              <p className="font-medium text-primary">
                Tutor Email:{" "}
                <span className="text-black">
                  {viewStudentBookedSessionDetailes?.tutorEmail}
                </span>
              </p>
              <p className="font-medium text-primary">
                Class Start Time:{" "}
                <span className="text-black">
                  {viewStudentBookedSessionDetailes?.classStartTime}
                </span>
              </p>
              <p className="font-medium text-primary">
                Class End Time:{" "}
                <span className="text-black">
                  {viewStudentBookedSessionDetailes?.classEndTime}
                </span>
              </p>
              <p className="font-medium text-primary">
                Session Duration:{" "}
                <span className="text-black">
                  {viewStudentBookedSessionDetailes?.sessionDuration}
                </span>
              </p>
              <p className="font-medium text-primary">
                Max Participants:{" "}
                <span className="text-black">
                  {viewStudentBookedSessionDetailes?.maxParticipants}
                </span>
              </p>{" "}
              {/* <p className="font-medium text-primary">
                Current Participants:{" "}
                <span className="text-black">
                  {viewStudentBookedSessionDetailes?.currentParticipants}
                </span>
              </p> */}
            </div>
          </div>
        )}

        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"Please Provide Your"}
            secondName={"Review & Rating"}
            description={
              "Feeling overwhelmed by upcoming exams and projects? Juggling a busy schedule can make it tough to keep track of your booked study sessions. This guide is here to help! Designed specifically for students, it will show you how to easily view and manage all your booked study sessions, ensuring you stay on top of your academic commitments."
            }
          ></SectionTitle>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:max-w-2xl md:mx-auto flex flex-col space-y-3"
        >
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Student Name:
            </label>
            <input
              disabled
              {...register("studentName", {
                value: user.displayName,
              })}
              type="text"
              placeholder="Student Name..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
          </div>{" "}
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Student Email:
            </label>
            <input
              disabled
              {...register("studentEmail", {
                value: user.email,
              })}
              type="text"
              placeholder="Student Email..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Your Review:
            </label>
            <textarea
              {...register("review", { required: true })}
              placeholder="Your Review..."
              name="review"
              id="review"
              rows={5}
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            ></textarea>

            {errors.review && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Review is required!
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Your Rating:
            </label>
            <input
              {...register("rating", { required: true, min: 1, max: 5 })}
              type="number"
              placeholder="Your Rating..."
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            />
            {errors.rating?.type === "required" && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Rating is required!
              </span>
            )}
            {errors.rating?.type === "min" && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Minimum rating 1!
              </span>
            )}
            {errors.rating?.type === "max" && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Maximum rating 5!
              </span>
            )}
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className=" group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-primary px-8 py-2 text-neutral-50 flex justify-between items-center gap-2"
            >
              <span className="relative z-10">Send Review & Rating</span>
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

export default ViewBookedSessionDetailes;
