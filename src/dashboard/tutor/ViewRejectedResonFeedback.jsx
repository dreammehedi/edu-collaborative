import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function ViewRejectedResonFeedback() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    data: viewRejectedResonFeedback,
  } = useQuery({
    queryKey: ["viewRejectedResonFeedback"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/view-rejected-reson-feedback/${id}`);
      const data = await res.data;
      return data;
    },
  });
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Dashboard | View Rejected Reson Feedback</title>
      </Helmet>
      <section className="py-12">
        <div className="container">
          <div className="flex justify-center text-center flex-col space-y-3">
            <SectionTitle
              firstCls={"text-black"}
              secondCls={"text-primary"}
              firstName={"View Study Session"}
              secondName={"Rejected Reson & Feedback"}
              description={
                "Managing and scheduling study sessions effectively is crucial for a smooth learning experience. If a study session you created has been rejected, it’s important to understand the reasons behind this decision and use the feedback to improve future sessions. Here’s a guide on how to view the rejection reasons and feedback for your study sessions."
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
          {viewRejectedResonFeedback && (
            <div className="my-12 flex flex-col space-y-3 w-full md:max-w-xl md:mx-auto shadow-md rounded-md p-4">
              <h2 className="font-semibold text-2xl text-primary">
                Reson & Feedback
              </h2>
              <p className="text-[15px] font-medium font-roboto text-red-500">
                {viewRejectedResonFeedback?.rejectReson}
              </p>
              <p className="text-[15px] font-medium font-roboto text-black">
                {viewRejectedResonFeedback?.rejectFeedback}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ViewRejectedResonFeedback;
