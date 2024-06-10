import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../../shared/button/Button";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import Pagination from "../../shared/pagination/Pagination";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import SectionTitle from "./../../shared/section_title/SectionTitle";
import ViewBookedSessionCart from "./ViewBookedSessionCart";

function ViewBookedSession() {
  const [totalBookedSessionCount, setTotalBookedSessionCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`/view-student-booked-session-count/${user?.email}`)
      .then((res) => res.data)
      .then((data) => {
        setTotalBookedSessionCount(data?.bookedSessionCount);
      });
  }, [axiosSecure, user?.email]);

  const {
    isPending,
    error,
    data: viewStudentBookedSession = [],
  } = useQuery({
    queryKey: ["viewStudentBookedSession", activePage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/view-student-booked-session/${user.email}?page=${activePage}`
      );
      const data = await res.data;
      return data;
    },
  });
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Dashboard | View Booked Session</title>
      </Helmet>
      <section className="space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"View Your"}
            secondName={"Booked Study Session"}
            description={
              "Feeling overwhelmed by upcoming exams and projects? Juggling a busy schedule can make it tough to keep track of your booked study sessions. This guide is here to help! Designed specifically for students, it will show you how to easily view and manage all your booked study sessions, ensuring you stay on top of your academic commitments."
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

        {viewStudentBookedSession.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
              {viewStudentBookedSession.map(
                (viewStudentBookedSessionData, ind) => {
                  return (
                    <ViewBookedSessionCart
                      key={ind}
                      viewStudentBookedSession={viewStudentBookedSessionData}
                    ></ViewBookedSessionCart>
                  );
                }
              )}
            </div>
            {totalBookedSessionCount > 3 && (
              <div>
                <Pagination
                  totalCount={totalBookedSessionCount}
                  perPageData={3}
                  activePage={activePage}
                  setActivePage={setActivePage}
                ></Pagination>
              </div>
            )}
          </>
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
      </section>
    </>
  );
}

export default ViewBookedSession;
