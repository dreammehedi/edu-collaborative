import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";
import ViewAllStudySessionCart from "./ViewAllStudySessionCart";

function ViewAllStudySession() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    refetch,
    data: ViewAllStudySession = [],
  } = useQuery({
    queryKey: ["ViewAllStudySessionTutor"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/view-all-study-session-tutor/${user?.email}`
      );
      const data = await res.data;
      return data;
    },
  });

  // handle status pending request
  const handlePendingRequest = async (id) => {
    const res = await axiosSecure.patch(`/status-pending-request/${id}`);
    const data = await res.data;
    if (data.modifiedCount > 0) {
      Swal.fire({
        title: "Request Sent Successfully",
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
  };
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Dashboard | View All Study Session</title>
      </Helmet>
      <section className="space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"View Your"}
            secondName={"Study Session"}
            description={
              "Empower your tutoring with this intuitive tool. Design and share in-depth study sessions, easily manage student access, and track progress – all in one place."
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
        {ViewAllStudySession.length > 0 && (
          <div className="grid grid-cols-2 gap-8 justify-between">
            {ViewAllStudySession.map((viewStudySession, ind) => {
              return (
                <ViewAllStudySessionCart
                  key={ind}
                  viewStudySession={viewStudySession}
                  handlePendingRequest={handlePendingRequest}
                ></ViewAllStudySessionCart>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default ViewAllStudySession;
