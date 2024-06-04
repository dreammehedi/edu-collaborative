import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { GiExplosiveMaterials, GiFloatingPlatforms } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ErrorDataImage from "../../../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../../../shared/section_title/SectionTitle";
import DataLoader from "./../../../../shared/data_loader/DataLoader";

function StudySessionDetailes() {
  const { id } = useParams();

  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();
  // study session detailes data load
  const {
    isPending,
    error,
    data: singleStudySessionData,
  } = useQuery({
    queryKey: ["singleStudySession"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/study-session-detailes/${id}`);
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
  const classEndTime = singleStudySessionData?.classEndDate;

  // handle study session booked
  const handleStudySessionBooked = () => {
    const fee = singleStudySessionData?.fee;

    const studySessionBookedFn = async () => {
      const { _id: studySessionId, ...studySessionCopy } =
        singleStudySessionData;
      const studySessionBookedData = {
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

          <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-fit bg-white rounded-md shadow-md overflow-hidden">
              <img
                className="object-cover w-full h-[400px]"
                src={singleStudySessionData?.image}
                alt="Article"
              />

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs font-medium font-roboto text-primary uppercase ">
                    {singleStudySessionData?.tutorName}
                  </span>
                  <h2 className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform  hover:text-gray-600">
                    {singleStudySessionData?.sessionTitle}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 ">
                    {singleStudySessionData?.sessionDescription}
                  </p>
                </div>
                <div className="flex flex-wrap gap-6">
                  <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Rating:{" "}
                      <span className="text-black font-roboto font-medium">
                        {singleStudySessionData?.averageRating}
                      </span>
                    </h3>
                  </div>{" "}
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
                      Max Participants:{" "}
                      <span className="text-black font-roboto font-medium">
                        3{singleStudySessionData?.maxParticipants}
                      </span>
                    </h3>
                  </div>
                  <div className="shadow-md p-4 text-center">
                    <h3 className="text-primary">
                      Current Participants:{" "}
                      <span className="text-black font-roboto font-medium">
                        {singleStudySessionData?.currentParticipants}
                      </span>
                    </h3>
                  </div>
                </div>
                <div
                  onClick={() => {
                    if (!isRegistrationEnd) return;
                    handleStudySessionBooked(id);
                  }}
                  className={`!mt-8 text-right ${
                    !isRegistrationEnd
                      ? "cursor-not-allowed"
                      : " cursor-pointer"
                  }`}
                >
                  <span
                    className={`${
                      isRegistrationEnd ? "bg-primary" : "bg-primary-main"
                    }  text-white font-medium rounded-md !px-4 !py-3 hover:bg-primary-main my-transition`}
                  >
                    {isRegistrationEnd ? "Book Now" : "Registration End"}
                  </span>
                </div>
              </div>
            </div>
            <div className="h-fit bg-white rounded-md shadow-md p-4 overflow-hidden space-y-10">
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
            </div>
          </div>
          <div className="py-12">
            <div className="space-y-3 flex justify-center text-center items-center flex-col w-full md:max-w-2xl md:mx-auto">
              <SectionTitle
                firstCls={"text-black"}
                secondCls={"text-primary"}
                firstName={"Study Session "}
                secondName={"Other Details"}
                description={
                  "This section provides additional important information about the study session to ensure participants are fully prepared and aware of what to expect. These details cover prerequisites, learning outcomes, session format, technical requirements, and contact information."
                }
              ></SectionTitle>
            </div>
            <div className="py-12 grid grid-cols-6 gap-6">
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
                  Class Start Time:{" "}
                  <span className="text-black font-roboto font-medium">
                    {classStartTime?.split("T")[1]}
                  </span>
                </h3>
              </div>
              <div className="shadow-md p-4 text-center">
                <h3 className="text-primary">
                  Class End Time:{" "}
                  <span className="text-black font-roboto font-medium">
                    {classEndTime?.split("T")[1]}
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
              <div className="shadow-md p-4 text-center">
                <h3 className="text-primary">
                  Location:{" "}
                  <span className="text-black font-roboto font-medium">
                    {singleStudySessionData?.sessionLocation}
                  </span>
                </h3>
              </div>
              <div className="shadow-md p-4 text-center">
                <h3 className="text-primary">
                  Session Type:{" "}
                  <span className="text-black font-roboto font-medium">
                    {singleStudySessionData?.sessionType}
                  </span>
                </h3>
              </div>{" "}
              <div className="shadow-md p-4 text-center">
                <h3 className="text-primary">
                  Prerequisites:{" "}
                  <span className="text-black font-roboto font-medium">
                    {singleStudySessionData?.prerequisites}
                  </span>
                </h3>
              </div>
            </div>
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
            <div className="py-12">
              <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
                <div className="p-8 border rounded-lg ">
                  <p className="leading-loose text-gray-500">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tempore quibusdam ducimus libero ad tempora doloribus
                    expedita laborum saepe voluptas perferendis delectus
                    assumenda rerum, culpa aperiam dolorum, obcaecati corrupti
                    aspernatur a.”.
                  </p>

                  <div className="flex items-center mt-8 -mx-2">
                    <img
                      className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300"
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      alt=""
                    />

                    <div className="mx-2">
                      <h1 className="font-semibold text-gray-800 ">Robert</h1>
                      <span className="text-sm text-gray-500">
                        CTO, Robert Consultency
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8 border rounded-lg ">
                  <p className="leading-loose text-gray-500">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tempore quibusdam ducimus libero ad tempora doloribus
                    expedita laborum saepe voluptas perferendis delectus
                    assumenda rerum, culpa aperiam dolorum, obcaecati corrupti
                    aspernatur a.”.
                  </p>

                  <div className="flex items-center mt-8 -mx-2">
                    <img
                      className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300"
                      src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                      alt=""
                    />

                    <div className="mx-2">
                      <h1 className="font-semibold text-gray-800 ">Jeny Doe</h1>
                      <span className="text-sm text-gray-500">
                        CEO, Jeny Consultency
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8 border rounded-lg ">
                  <p className="leading-loose text-gray-500">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tempore quibusdam ducimus libero ad tempora doloribus
                    expedita laborum saepe voluptas perferendis delectus
                    assumenda rerum, culpa aperiam dolorum, obcaecati corrupti
                    aspernatur a.”.
                  </p>

                  <div className="flex items-center mt-8 -mx-2">
                    <img
                      className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300"
                      src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt=""
                    />

                    <div className="mx-2">
                      <h1 className="font-semibold text-gray-800 ">
                        Ema Watson{" "}
                      </h1>
                      <span className="text-sm text-gray-500">
                        Marketing Manager at Stech
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudySessionDetailes;
