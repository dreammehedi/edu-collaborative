import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import Button from "./../../shared/button/Button";

function ViewAllStudyMaterial() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showStudySessionMaterial, setShowStudySessionMaterial] =
    useState(false);
  const [getMaterialDataBookedSession, setMaterialDataBookedSession] = useState(
    []
  );
  console.log(getMaterialDataBookedSession);

  const {
    isPending,
    error,
    data: viewBookedStudySessionStudent = [],
  } = useQuery({
    queryKey: ["viewBookedStudySessionStudent"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/view-booked-study-session-student/${user?.email}`
      );
      const resData = await response.data;
      return resData;
    },
  });

  // handle view material
  const handleViewMaterial = async (studySessionMaterialInfo) => {
    setShowStudySessionMaterial(true);
    const response = await axiosSecure.get(
      `/all-material-student-booked-session/${studySessionMaterialInfo?.studySessionId}`
    );
    const responseData = await response.data;
    setMaterialDataBookedSession(responseData);
  };
  return (
    <>
      <section className="relative space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"View All Study Session Materials"}
            secondName={"Provide Tutor"}
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

        {viewBookedStudySessionStudent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-between">
            {viewBookedStudySessionStudent.map((viewStudySession, ind) => {
              return (
                <div key={ind} className="p-4 rounded-md shadow-md">
                  <img
                    className="object-cover w-full h-[150px] rounded-md"
                    src={viewStudySession?.image}
                    alt=""
                  />
                  <h2 className="font-medium mt-2">
                    {viewStudySession?.sessionTitle}
                  </h2>
                  <div
                    onClick={() => {
                      handleViewMaterial(viewStudySession);
                    }}
                    className="mt-2"
                  >
                    <Button name={"View Material"}></Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="pt-12">
            <h2 className="text-red-500 text-center ">
              {`Hi there! We noticed that you haven’t booked any study sessions
              yet. Booking a session is a great way to kickstart your learning
              journey and take full advantage of our platform. Here’s a simple
              guide to help you book your first session.`}
            </h2>

            <div className="flex justify-center mt-6">
              <Link to={"/"}>
                <Button name={"Visit Study Session"}></Button>
              </Link>
            </div>
          </div>
        )}
        {showStudySessionMaterial > 0 && (
          <div className="absolute max-w-4xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-auto bg-gray-200 z-[9999] p-8 rounded-md shadow-md">
            <h2 className="text-center font-medium text-2xl text-primary">
              Get Your Material Provide by Tutor In This Study Session
            </h2>
            {getMaterialDataBookedSession.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-4 md:gap-6">
                {getMaterialDataBookedSession.map((materialData) => {
                  return (
                    <div
                      key={materialData?._id}
                      className="rounded-md p-4 shadow-md space-y-3 "
                    >
                      <img
                        className="rounded-md w-full h-[280px] md:h-[130px] lg:h-[150px]"
                        src={materialData?.materialImageUrl}
                        alt=""
                      />
                      <span className="text-sm font-semibold flex flex-wrap items-center gap-2 text-primary">
                        Study Session Material Id:{" "}
                        <p>{materialData?.mainStudySessionId}</p>
                      </span>
                      <div className="pt-2">
                        <a
                          title="Visit Material Google Drive Link"
                          target="_blank"
                          className="font-roboto font-semibold underline "
                          href={materialData?.materialLink}
                        >
                          Material Link
                        </a>
                      </div>

                      <div>
                        <button className="text-sm font-medium font-roboto text-white bg-primary my-transition hover:bg-primary-main rounded-md px-3 py-1">
                          Download Image
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="pt-12">
                <h2 className="text-red-500 text-center ">
                  {`Hi there! We noticed that tutor haven’t provide any study sessions materials
              yet. Booking a session is a great way to kickstart your learning
              journey and take full advantage of our platform. Here’s a simple
              guide to help you book your first session.`}
                </h2>

                <div className="flex justify-center mt-6">
                  <Link to={`/dashboard/view-booked-session`}>
                    <Button name={"Provide Feedback"}></Button>
                  </Link>
                </div>
              </div>
            )}

            <div
              onClick={() => {
                setShowStudySessionMaterial(false);
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

export default ViewAllStudyMaterial;
