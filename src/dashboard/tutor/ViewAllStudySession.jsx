import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/section_title/SectionTitle";
import ViewAllStudySessionCart from "./ViewAllStudySessionCart";

function ViewAllStudySession() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: ViewAllStudySession = [] } = useQuery({
    queryKey: ["ViewAllStudySessionTutor"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/view-all-study-session-tutor/${user?.email}`
      );
      const data = await res.data;
      return data;
    },
  });

  console.log(ViewAllStudySession);
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

        <div className="grid grid-cols-2 gap-8 justify-between">
          {ViewAllStudySession.map((viewStudySession, ind) => {
            return (
              <ViewAllStudySessionCart
                key={ind}
                viewStudySession={viewStudySession}
              ></ViewAllStudySessionCart>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default ViewAllStudySession;
