import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import UploadMaterialModal from "../../modal/UploadMaterialModal";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import Button from "./../../shared/button/Button";

function UploadMaterials() {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [uploadMaterialModal, setUploadmaterialModal] = useState(false);
  const [studySessionMainData, setStudySessionMainData] = useState({});

  // image hosting key in imgbb
  const imageHostingApiKey = import.meta.env.VITE_HOSTING_API_KEY;
  const imageHostingApiUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

  const {
    isPending,
    error,
    data: studySessionMaterial = [],
  } = useQuery({
    queryKey: ["uploadMaterialsSession"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/view-all-study-success-session-tutor/${user?.email}`
      );
      const resData = await response.data;
      return resData;
    },
  });

  // handle material upload
  const handleUploadMaterial = (studySessionData) => {
    setUploadmaterialModal(true);
    setStudySessionMainData(studySessionData);
  };

  // on upload material
  const onUploadMaterial = async (materialUploadData) => {
    const materialImageFiels = { image: materialUploadData?.materialImage[0] };
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
        mainStudySessionId: studySessionMainData?._id,
        tutorEmail: user?.email,
        materialImageUrl: materialImageUrl,
        materialLink: materialUploadData?.materialLink,
      };

      const responsePost = await axiosSecure.post(
        "/upload-study-session-material",
        uploadedMaterialStudySessionData
      );
      const responsePostData = await responsePost.data;
      console.log(responsePostData);
      if (responsePostData.insertedId) {
        setUploadmaterialModal(false);
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

  return (
    <>
      <section className="space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"Upload Your"}
            secondName={"Materials"}
            description={
              "Our intuitive tool allows you to enhance study sessions by uploading and sharing materials seamlessly. Simply gather your documents, images, and Google Drive links, then upload them to your session. Organize your materials for easy access, ensuring a collaborative and effective learning experience."
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

        {studySessionMaterial.length > 0 && (
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 justify-between gap-4 md:gap-6">
            {studySessionMaterial.map((studySessionData, ind) => {
              return (
                <div key={ind} className="rounded-md p-4 shadow-md space-y-2">
                  <img
                    className="rounded-md w-full h-[280px] md:h-[130px] lg:h-[150px]"
                    src={studySessionData?.image}
                    alt=""
                  />
                  <span className="font-roboto text-sm font-semibold text-green-500">
                    {studySessionData?.status}
                  </span>
                  <h2>{studySessionData?.sessionTitle}</h2>
                  <div
                    onClick={() => {
                      handleUploadMaterial(studySessionData);
                    }}
                  >
                    <Button name={"Upload Material"}></Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {uploadMaterialModal && (
          <div className="my-transition fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex justify-center items-center p-8 z-[999] shadow-lg shadow-primary  w-full md:max-w-2xl md:mx-auto rounded-md flex-col ">
            <UploadMaterialModal
              studySessionSuccessData={studySessionMainData}
              onUploadMaterial={onUploadMaterial}
            ></UploadMaterialModal>
            <div
              onClick={() => {
                setUploadmaterialModal(false);
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

export default UploadMaterials;
