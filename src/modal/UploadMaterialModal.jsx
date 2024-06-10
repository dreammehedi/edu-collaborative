import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
function UploadMaterialModal({ studySessionSuccessData, onUploadMaterial }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <p className="text-[18px] flex font-bold text-primary items-center gap-2">
        <span className="text-xl font-semibold  text-black">
          Session Name:{" "}
        </span>
        {studySessionSuccessData?.sessionTitle}
      </p>
      <p className="text-[18px] flex font-bold text-primary items-center gap-2">
        <span className="text-xl font-semibold  text-black ">Session Id: </span>
        {studySessionSuccessData?._id}
      </p>
      <p className="text-[18px] flex font-bold text-primary items-center gap-2">
        <span className="text-xl font-semibold  text-black">Tutor Email: </span>
        {studySessionSuccessData?.tutorEmail}
      </p>
      <form
        onSubmit={handleSubmit(onUploadMaterial)}
        className="flex flex-col space-y-3"
      >
        <h2 className="py-4 text-2xl font-bold text-center text-primary">
          Upload Your Material
        </h2>
        <div className="space-y-1">
          <label className=" font-roboto font-medium text-[15px]">
            Material Image:
          </label>
          <input
            {...register("materialImage", { required: true })}
            type="file"
            placeholder="Material Image..."
            className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
          />
          {errors.materialImage?.type === "required" && (
            <span className="text-xs mt-2 font-bold text-red-500">
              Material Image is Required!
            </span>
          )}
        </div>
        <div className="space-y-1">
          <label className=" font-roboto font-medium text-[15px]">
            Material Google Drive Link:
          </label>
          <input
            {...register("materialLink", { required: true })}
            type="url"
            placeholder="Google Drive Link..."
            className="my-transition w-full border border-slate-200 bg-primary/10 rounded-md py-2 px-4 outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:font-roboto placeholder:text-[13px] placeholder:text-primary"
          />
          {errors.materialLink?.type === "required" && (
            <span className="text-xs mt-2 font-bold text-red-500">
              Material Google Drive Link is Required!
            </span>
          )}
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className=" group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-primary px-8 py-2 text-neutral-50 flex justify-between items-center gap-2"
          >
            <span className="relative z-10">Update Material</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-primary-main transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
UploadMaterialModal.propTypes = {
  studySessionSuccessData: PropTypes.object.isRequired,
  onUploadMaterial: PropTypes.func.isRequired,
};
export default UploadMaterialModal;
