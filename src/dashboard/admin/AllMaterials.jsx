import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Button from "../../shared/button/Button";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function AllMaterials() {
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    refetch,
    data: studySessionAllMaterialData = [],
  } = useQuery({
    queryKey: ["allStudySessionMaterialsByAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-study-session-material-by-admin");
      const data = await res.data;
      return data;
    },
  });

  // hanlde material delete
  const handleMaterialDelete = async (materialId) => {
    Swal.fire({
      title: "Are You Sure!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.delete(
          `/delete-study-session-material-by-admin/${materialId}`
        );
        const responseData = await response.data;
        if (responseData.deletedCount > 0) {
          Swal.fire({
            title: "Material Deleted Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        } else {
          Swal.fire({
            title: "An error occurred!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <>
      <section className="space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"View All"}
            secondName={"Materials"}
            description={
              "This intuitive tool allows you to design and share in-depth study sessions, creating valuable resources for your students and fellow tutors. You can upload materials for your approved sessions, including images and Google Drive links. Follow the steps below to set up and use this feature."
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

        {studySessionAllMaterialData.length > 0 ? (
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 justify-between gap-4 md:gap-6">
            {studySessionAllMaterialData.map(
              (studySessionMaterialData, ind) => {
                return (
                  <div
                    key={ind}
                    className="rounded-md p-4 shadow-md space-y-3 "
                  >
                    <img
                      className="rounded-md w-full h-[280px] md:h-[130px] lg:h-[150px]"
                      src={studySessionMaterialData?.materialImageUrl}
                      alt=""
                    />
                    <span className="text-sm font-semibold flex flex-wrap items-center gap-2 text-primary">
                      Study Session Material Id:{" "}
                      <p>{studySessionMaterialData?.mainStudySessionId}</p>
                    </span>
                    <div className="pt-2">
                      <a
                        title="Visit Material Google Drive Link"
                        target="_blank"
                        className="font-roboto font-semibold underline "
                        href={studySessionMaterialData?.materialLink}
                      >
                        Material Link
                      </a>
                    </div>
                    <span className="font-roboto text-sm font-semibold text-green-500">
                      {studySessionMaterialData?.tutorEmail}
                    </span>
                    <div className="flex flex-wrap justify-between items-center gap-3">
                      <div
                        onClick={() => {
                          handleMaterialDelete(studySessionMaterialData?._id);
                        }}
                      >
                        <Button name={"Delete"}></Button>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="pt-12">
            <h2 className="text-red-500 text-center ">
              {`As an admin, you hold the key to enriching the learning experience for our users. If tutors haven't uploaded study materials yet, take the initiative! Your contribution can shape students' understanding and support tutors in their sessions. Craft informative content, enhance it with visuals, and cover essential topics..`}
            </h2>
          </div>
        )}
      </section>
    </>
  );
}

export default AllMaterials;
