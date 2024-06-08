import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../shared/section_title/SectionTitle";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function CreateNote() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const studentCreatedNoteData = {
      studentName: user.displayName,
      studentImage: user.photoURL,
      ...data,
    };
    const res = await axiosSecure.post(
      "/student-creat-note",
      studentCreatedNoteData
    );

    const resData = await res.data;
    if (resData.insertedId) {
      Swal.fire({
        title: "Note Created Successfully",
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
        <title>EduCollaborate | Dashboard | Create Note</title>
      </Helmet>
      <section className="space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"Create Your"}
            secondName={"Personal Note"}
            description={
              "A space to track my progress in personal development activities, such as skill-building, mindfulness practices, and self-improvement exercises.A space to track my progress in personal development activities, such as skill-building, mindfulness practices, and self-improvement exercises."
            }
          ></SectionTitle>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 w-full md:max-w-2xl md:mx-auto"
        >
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Student Email:
            </label>
            <input
              type="text"
              disabled
              {...register("studentEmail", { value: user.email })}
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
              placeholder="Student Email..."
              name="studentEmail"
              id="studentEmail"
            />
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Note Title:
            </label>
            <input
              type="text"
              {...register("noteTitle", { required: true })}
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
              placeholder="Note Title..."
              name="noteTitle"
              id="noteTitle"
            />

            {errors.noteTitle && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Note Title is Required!
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label className=" font-roboto font-medium text-[15px]">
              Note Description:
            </label>
            <textarea
              rows={5}
              {...register("noteDescription", { required: true })}
              name="noteDescription"
              id="noteDescription"
              className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
              placeholder="Note Description..."
            ></textarea>

            {errors.noteDescription && (
              <span className="text-xs mt-2 font-bold text-red-500">
                Note Description is Required!
              </span>
            )}
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className=" group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-primary px-8 py-2 text-neutral-50 flex justify-between items-center gap-2"
            >
              <span className="relative z-10">Create Note</span>
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

export default CreateNote;
