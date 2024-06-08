import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdStar } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ErrorDataImage from "../../../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../../../shared/section_title/SectionTitle";
import DataLoader from "./../../../../shared/data_loader/DataLoader";

function StudySessionDetailes() {
  const { id } = useParams();

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [resUserRole, setResUserRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const res = await axiosPublic.get(`/check-user-role/${user?.email}`);
      const resData = await res.data;
      setResUserRole(resData.resUserRoleIs);
    };
    checkUserRole();
  }, [axiosPublic, user?.email]);

  const navigate = useNavigate();

  // study session detailes data load
  const {
    isPending,
    error,
    data: singleStudySessionData,
  } = useQuery({
    queryKey: ["singleStudySessionDetailes"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/study-session-detailes/${id}`);
      const data = await res.data;
      return data;
    },
  });

  // study session review data load
  const {
    isPending: isPendingReview,
    error: isErrorReview,
    data: singleStudySessionReviewData = [],
  } = useQuery({
    queryKey: ["singleStudySessionReview"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/study-session-review/${id}`);
      const data = await res.data;
      return data;
    },
  });

  // current date
  const currentDate = moment().format();

  const isRegistrationEnd = moment(
    singleStudySessionData?.registrationEndDate
  ).isSameOrAfter(currentDate);

  const classStartTime = singleStudySessionData?.classStartTime;
  const classEndTime = singleStudySessionData?.classEndTime;

  // handle study session booked
  const handleStudySessionBooked = () => {
    const fee = singleStudySessionData?.fee;

    const studySessionBookedFn = async () => {
      const { _id: studySessionId, ...studySessionCopy } =
        singleStudySessionData;
      const studySessionBookedData = {
        studentName: user.displayName,
        studentEmail: user.email,
        studentImage: user.photoURL,
        studySessionId,
        ...studySessionCopy,
      };
      const response = await axiosPublic.post(
        "/study-session-booked",
        studySessionBookedData
      );
      const data = await response.data;

      if (data.insertedId) {
        Swal.fire({
          title: "Study Session Booked Successfully",
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
    if (fee === 0) {
      studySessionBookedFn();
    } else {
      navigate("/payment");
    }
  };
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Study Session Detailes</title>
      </Helmet>
      <section className="py-12">
        <div className="container">
          <div className="flex justify-center text-center flex-col space-y-3">
            <SectionTitle
              firstCls={"text-primary"}
              secondCls={"text-black"}
              firstName={"Study Session"}
              secondName={"Detailes"}
              description={
                "An overview of the specific study session, including its title, tutor, and key information."
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

          <div className="py-12 flex flex-col space-y-4">
            <div className="h-fit w-full md:max-w-3xl md:mx-auto bg-white rounded-md shadow-md overflow-hidden">
              <img
                className="object-cover w-full h-[400px]"
                src={singleStudySessionData?.image}
                alt="Article"
              />

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-medium font-roboto text-primary uppercase ">
                    {singleStudySessionData?.tutorName}
                  </p>{" "}
                  <p className="text-xs font-medium font-roboto text-slate-500  ">
                    {singleStudySessionData?.tutorEmail}
                  </p>
                  <h2 className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform  hover:text-gray-600">
                    {singleStudySessionData?.sessionTitle}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 ">
                    {singleStudySessionData?.sessionDescription}
                  </p>
                </div>
                <div className="flex flex-wrap gap-6">
                  {/* <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Rating:
                      <span className="text-black font-roboto font-medium">
                        {singleStudySessionData?.rating}
                      </span>
                    </h3>
                  </div> */}
                  <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Fee:{" "}
                      <span className="text-black font-roboto font-medium">
                        ${singleStudySessionData?.fee}
                      </span>
                    </h3>
                  </div>
                  <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Registration Start Date:{" "}
                      <span className="text-black font-roboto font-medium">
                        {singleStudySessionData?.registrationStartDate}
                      </span>
                    </h3>
                  </div>
                  <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Registration End Date:{" "}
                      <span className="text-black font-roboto font-medium">
                        {singleStudySessionData?.registrationEndDate}
                      </span>
                    </h3>
                  </div>
                  <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Max Participants:{" "}
                      <span className="text-black font-roboto font-medium">
                        3{singleStudySessionData?.maxParticipants}
                      </span>
                    </h3>
                  </div>
                  <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Class Start Time: {""}
                      <span className="text-black font-roboto font-medium">
                        {classStartTime}
                      </span>
                    </h3>
                  </div>
                  <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Class End Time:{" "}
                      <span className="text-black font-roboto font-medium">
                        {classEndTime}
                      </span>
                    </h3>
                  </div>
                  <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Session Duration:{" "}
                      <span className="text-black font-roboto font-medium">
                        {singleStudySessionData?.sessionDuration}
                      </span>
                    </h3>
                  </div>
                </div>
                <div className="">
                  <button
                    onClick={() => {
                      if (!isRegistrationEnd || !resUserRole) return;
                      handleStudySessionBooked(id);
                    }}
                    className={`mt-6  ${
                      !isRegistrationEnd || !resUserRole
                        ? "cursor-not-allowed"
                        : " cursor-pointer"
                    }`}
                  >
                    <span
                      className={`${
                        isRegistrationEnd ? "bg-primary" : "bg-primary-main"
                      }  text-white font-medium rounded-md hover:bg-primary-main my-transition  px-4 py-3`}
                    >
                      {isRegistrationEnd ? "Book Now" : "Registration End"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="h-fit bg-white rounded-md shadow-md p-4 overflow-hidden space-y-10">
              <div className="flex flex-col text-center justify-center items-center">
                <div className="space-y-2">
                  <SectionTitle
                    firstCls={"text-black"}
                    secondCls={"text-primary"}
                    firstName={"Materials and "}
                    secondName={"Resources"}
                    description={
                      "An overview of the specific study session, including its title, tutor, and key information."
                    }
                  ></SectionTitle>
                </div>
                <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {singleStudySessionData?.materialsProvided.map(
                    (material, ind) => {
                      return (
                        <div
                          key={ind}
                          className="shadow-md p-4 rounded-md flex flex-col items-center justify-center space-y-2"
                        >
                          <GiExplosiveMaterials className="text-3xl text-primary"></GiExplosiveMaterials>
                          <span className="font-medium text-sm">
                            {material}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="flex flex-col text-center justify-center items-center">
                <div className="space-y-2">
                  <SectionTitle
                    firstCls={"text-primary"}
                    secondCls={"text-black"}
                    firstName={"Platform  "}
                    secondName={"Features"}
                    description={
                      "Explore the powerful features of our collaborative study platform that are designed to facilitate an engaging and effective learning experience. These tools help students and tutors collaborate seamlessly and enhance the overall educational process."
                    }
                  ></SectionTitle>
                </div>
                <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {singleStudySessionData?.platformFeatures.map(
                    (platformFeature, ind) => {
                      return (
                        <div
                          key={ind}
                          className="shadow-md p-4 rounded-md flex flex-col items-center justify-center space-y-2"
                        >
                          <GiFloatingPlatforms className="text-3xl text-primary"></GiFloatingPlatforms>
                          <span className="font-medium text-sm">
                            {platformFeature}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div> */}
          </div>

          <div className="py-12">
            <div className="space-y-3 flex justify-center text-center items-center flex-col w-full md:max-w-2xl md:mx-auto">
              <SectionTitle
                firstCls={"text-primary"}
                secondCls={"text-black"}
                firstName={"Study Session "}
                secondName={"Review"}
                description={
                  "This section features feedback and testimonials from participants who have previously attended the study session. It helps potential participants gauge the effectiveness and quality of the session based on others' experiences."
                }
              ></SectionTitle>
            </div>

            {isPendingReview && (
              <div className="flex justify-center py-12 ">
                <DataLoader></DataLoader>
              </div>
            )}
            {isErrorReview && (
              <div className="flex flex-col spacey-2 justify-center items-center">
                <ErrorDataImage></ErrorDataImage>
                <span className="text-red-500">
                  An error has occurred: {error.message}
                </span>
              </div>
            )}
            {singleStudySessionReviewData.length > 0 ? (
              <div className="py-12">
                <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
                  {singleStudySessionReviewData.map(
                    (studySessionReview, ind) => {
                      const {
                        studentImage,
                        studentName,
                        studentEmail,
                        review,
                        rating,
                      } = studySessionReview;
                      return (
                        <div key={ind} className=" p-8 border rounded-lg ">
                          <div className="flex flex-col space-y-3 text-center">
                            <p className="leading-loose text-gray-500">
                              “{review}”.
                            </p>
                            <span className="font-medium justify-center flex items-center gap-1">
                              Rating: {rating}
                              <MdStar className="text-base text-yellow-500"></MdStar>
                            </span>
                          </div>
                          <div className="flex items-center mt-8 -mx-2">
                            <img
                              className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300"
                              src={studentImage}
                              alt=""
                            />

                            <div className="mx-2">
                              <h1 className="font-semibold text-gray-800 ">
                                {studentName}
                              </h1>
                              <span className="text-sm text-gray-500">
                                {studentEmail}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </section>
              </div>
            ) : (
              <div className="pt-12">
                <h2 className="text-red-500 text-center ">
                  No review and rating found!
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default StudySessionDetailes;
