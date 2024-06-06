import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

function UpdateStudentCreateNoteModal({ onUpdate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form
        onSubmit={handleSubmit(onUpdate)}
        className="flex flex-col space-y-4 w-full md:max-w-2xl md:mx-auto"
      >
        <div className="space-y-1">
          <label className=" font-roboto font-medium text-[15px]">
            Note Title:
          </label>
          <input
            type="text"
            {...register("noteTitle", { required: true })}
            className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            placeholder="Update Note Title..."
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
            className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            placeholder="Update Note Description..."
            name="noteDescription"
            id="noteDescription"
          />

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
            <span className="relative z-10">Update Note</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-primary-main transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
UpdateStudentCreateNoteModal.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
export default UpdateStudentCreateNoteModal;
