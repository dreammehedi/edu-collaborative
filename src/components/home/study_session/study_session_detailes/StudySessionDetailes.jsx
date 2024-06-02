import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { GiExplosiveMaterials, GiFloatingPlatforms } from "react-icons/gi";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ErrorDataImage from "../../../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../../../shared/section_title/SectionTitle";
import DataLoader from "./../../../../shared/data_loader/DataLoader";

function StudySessionDetailes() {
  const { id } = useParams();

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

  const classStartTime = singleStudySessionData?.classStartTime;
  const classEndTime = singleStudySessionData?.classEndDate;
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

          <div className=" py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <div className="flex gap-6">
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
            <div className="space-y-3 flex justify-center items-center flex-col w-full md:max-w-2xl md:mx-auto">
              <SectionTitle
                firstCls={"text-primary"}
                secondCls={"text-black"}
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
              </div>{" "}
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
        </div>
      </section>
    </>
  );
}

export default StudySessionDetailes;
