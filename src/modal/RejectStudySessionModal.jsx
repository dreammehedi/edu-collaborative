import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

function RejectStudySessionModal({ onReject }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form
        onSubmit={handleSubmit(onReject)}
        className="grid grid-cols-2 gap-8 justify-between"
      >
        <div className="space-y-1">
          <label className=" font-roboto font-medium text-[15px]">
            Rejection Reson:
          </label>
          <textarea
            rows={5}
            {...register("rejectionReson", { required: true })}
            className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            placeholder="Rejection Reson..."
            name="rejectionReson"
            id="rejectionReson"
          ></textarea>

          {errors.rejectionReson && (
            <span className="text-xs mt-2 font-bold text-red-500">
              Rejection Reson is Required!
            </span>
          )}
        </div>
        <div className="space-y-1">
          <label className=" font-roboto font-medium text-[15px]">
            Rejection Feedback:
          </label>
          <textarea
            rows={5}
            {...register("rejectionFeedback", { required: true })}
            className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
            placeholder="Rejection Feedback..."
            name="rejectionFeedback"
            id="rejectionFeedback"
          ></textarea>

          {errors.rejectionFeedback && (
            <span className="text-xs mt-2 font-bold text-red-500">
              Rejection Feedback is Required!
            </span>
          )}
          {errors.maxParticipants?.type === "max" && (
            <span className="text-xs mt-2 font-bold text-red-500">
              Max Student Partipants 100!
            </span>
          )}
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className=" group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-primary px-8 py-2 text-neutral-50 flex justify-between items-center gap-2"
          >
            <span className="relative z-10">Reject Study Session</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-primary-main transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
RejectStudySessionModal.propTypes = {
  onReject: PropTypes.func.isRequired,
};
export default RejectStudySessionModal;
