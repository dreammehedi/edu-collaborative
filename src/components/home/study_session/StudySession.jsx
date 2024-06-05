import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Button from "../../../shared/button/Button";
import DataLoader from "../../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../../shared/section_title/SectionTitle";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import StudySessionCart from "./StudySessionCart";

function StudySession() {
  const [sliceData, setSliceData] = useState(3);

  const axiosPublic = useAxiosPublic();
  // get study session data
  const {
    isPending,
    error,
    data: studySessionData = [],
  } = useQuery({
    queryKey: ["studySession"],
    queryFn: async () => {
      const res = await axiosPublic.get("/study-session");
      const data = await res.data;
      return data;
    },
  });

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"Study"}
            secondName={"Session"}
            description={
              "Our study sessions are designed to help you master your subjects through collaboration and expert guidance."
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
        {studySessionData.length > 0 && (
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {studySessionData
              .slice(0, `${sliceData}`)
              .map((studySession, ind) => {
                return (
                  <StudySessionCart
                    studySession={studySession}
                    key={ind}
                  ></StudySessionCart>
                );
              })}
          </div>
        )}

        {studySessionData.length > sliceData && (
          <div
            onClick={() => {
              setSliceData(sliceData + 4);
            }}
            className="flex justify-center"
          >
            <Button name={"See all Session"}></Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default StudySession;
