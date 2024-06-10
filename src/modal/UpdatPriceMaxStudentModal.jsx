import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

function UpdatPriceMaxStudentModal({
  onUpdatePriceMaxStudent,
  studySessionUpdateData,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const maxParticipantsStudent = parseInt(
    studySessionUpdateData?.maxParticipants
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onUpdatePriceMaxStudent)}
        className="flex flex-col space-y-3"
      >
        <div className="space-y-1">
          <label className=" font-roboto font-medium text-[15px]">
            Session Fee:
          </label>
          <input
            defaultValue={studySessionUpdateData?.fee}
            {...register("fee", { min: 0, max: 20000 })}
            type="number"
            placeholder="$ Fee..."
            className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
          />
          {errors.fee?.type === "min" && (
            <span className="text-xs mt-2 font-bold text-red-500">
              Session Fee is Not Negative Value!
            </span>
          )}
          {errors.fee?.type === "max" && (
            <span className="text-xs mt-2 font-bold text-red-500">
              Max Session Fee is 1000!
            </span>
          )}
        </div>
        <div className="space-y-1">
          <label className=" font-roboto font-medium text-[15px]">
            Max Participants:
          </label>
          <input
            defaultValue={maxParticipantsStudent}
            {...register("maxParticipants", { required: true, max: 2000 })}
            type="number"
            placeholder="  Max Participants..."
            className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
          />
          {errors.maxParticipants?.type === "required" && (
            <span className="text-xs mt-2 font-bold text-red-500">
              Max Partipants is required!
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
            <span className="relative z-10">Update Study Session</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-primary-main transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
UpdatPriceMaxStudentModal.propTypes = {
  onUpdatePriceMaxStudent: PropTypes.func.isRequired,
  studySessionUpdateData: PropTypes.object.isRequired,
};
export default UpdatPriceMaxStudentModal;
