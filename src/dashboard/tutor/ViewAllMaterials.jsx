import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import UpdateMaterialModal from "../../modal/UpdateMaterialModal";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import Button from "./../../shared/button/Button";

function ViewAllMaterials() {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [updateMaterialModal, setUpdateMaterialModal] = useState(false);
  const [studySessionMaterialMainData, setStudySessionMaterialMainData] =
    useState({});

  // image hosting key in imgbb
  const imageHostingApiKey = import.meta.env.VITE_HOSTING_API_KEY;
  const imageHostingApiUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

  const {
    isPending,
    error,
    refetch,
    data: viewStudySessionMaterial = [],
  } = useQuery({
    queryKey: ["viewAllMaterialsSession"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/all-study-session-material/${user?.email}`
      );
      const resData = await response.data;
      return resData;
    },
  });

  // handle material upload
  const handleMaterialUpdate = (StudySessionMaterialData) => {
    setUpdateMaterialModal(true);
    setStudySessionMaterialMainData(StudySessionMaterialData);
  };

  // on upload material
  const onUpdateMaterial = async (materialUpdateData) => {
    const materialImageFiels = {
      image: materialUpdateData?.materialImage[0],
    };
    const response = await axiosPublic.post(
      imageHostingApiUrl,
      materialImageFiels,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = await response.data;
    if (resData.success) {
      const materialImageUrl = resData.data.display_url;
      const uploadedMaterialStudySessionData = {
        materialImageUrl: materialImageUrl,
        materialLink: materialUpdateData?.materialLink,
      };

      const responsePost = await axiosSecure.patch(
        `/update-study-session-material/${studySessionMaterialMainData?._id}`,
        uploadedMaterialStudySessionData
      );
      const responsePostData = await responsePost.data;
      if (responsePostData.modifiedCount > 0) {
        setUpdateMaterialModal(false);
        refetch();
        Swal.fire({
          title: "Material Uploaded Successfully",
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
    }
  };

  // handle material delete
  const handleMaterialDelete = (id) => {
    Swal.fire({
      title: "Are You Sure!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(
          `/delete-study-session-material/${id}`
        );
        const data = await res.data;
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Material Deleted Successfully",
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

        {viewStudySessionMaterial.length > 0 ? (
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 justify-between gap-4 md:gap-6">
            {viewStudySessionMaterial.map((studySessionMaterialData, ind) => {
              return (
                <div key={ind} className="rounded-md p-4 shadow-md space-y-3 ">
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
                        handleMaterialUpdate(studySessionMaterialData);
                      }}
                    >
                      <Button name={"Update"}></Button>
                    </div>
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
            })}
          </div>
        ) : (
          <div className="pt-12">
            <h2 className="text-red-500 text-center ">
              {`Hi there! We noticed that you haven’t uploade any study sessions material yet. Managing your material is a fantastic way to organize your learning schedule and take full advantage of our platform. Here’s a simple guide to help you create your first study session material.`}
            </h2>

            <div className="flex justify-center mt-6">
              <Link to={"/dashboard/upload-materials"}>
                <Button name={"Upload Material"}></Button>
              </Link>
            </div>
          </div>
        )}

        {updateMaterialModal && (
          <div className="my-transition fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex justify-center items-center p-8 z-[999] shadow-lg shadow-primary  w-full md:max-w-2xl md:mx-auto rounded-md flex-col ">
            <UpdateMaterialModal
              studySessionMaterialMainData={studySessionMaterialMainData}
              onUpdateMaterial={onUpdateMaterial}
            ></UpdateMaterialModal>
            <div
              onClick={() => {
                setUpdateMaterialModal(false);
              }}
              className="absolute top-4 right-4 p-3 cursor-pointer bg-red-100/50 rounded-full"
            >
              <AiOutlineClose className=" text-xl text-red-500"></AiOutlineClose>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ViewAllMaterials;
