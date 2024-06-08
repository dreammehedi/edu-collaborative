import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AcceptStudySessionModal from "../../modal/AcceptStudySessionModal";
import RejectStudySessionModal from "../../modal/RejectStudySessionModal";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";

function AllStudySession() {
  // accept status modal
  const [acceptStatusModal, setAcceptStatusModal] = useState(false);

  // reject status modal
  const [rejectStatusModal, setRejectStatusModal] = useState(false);

  const [studySessionAcceptId, setStudySessionAcceptId] = useState("");

  const [studySessionRejectId, setStudySessionRejectId] = useState("");

  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    error,
    refetch,
    data: allStudySession = [],
  } = useQuery({
    queryKey: ["allStudySessionTutor"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-study-session-admin`);
      const resData = await res.data;
      const resDataLength = resData.length;
      const statusSuccess = resData.filter(
        (studySession) => studySession.status === "success"
      );
      const statusPending = resData.filter(
        (studySession) => studySession.status === "pending"
      );
      const statusReject = resData.filter(
        (studySession) => studySession.status === "rejected"
      );
      return { resDataLength, statusSuccess, statusPending, statusReject };
    },
  });

  // handle status accept
  const handleStatusAccept = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5c6bc0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok, Accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAcceptStatusModal(true);
        setStudySessionAcceptId(id);
      }
    });
  };
  // handle status reject
  const handleStatusReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5c6bc0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setRejectStatusModal(true);
        setStudySessionRejectId(id);
      }
    });
  };

  const onAccept = (adminSessionDataUpdate) => {
    const fee = Number(adminSessionDataUpdate.fee);
    const maxParticipants = adminSessionDataUpdate.maxParticipants;

    const studySessionUpdatedData = { fee, maxParticipants };
    // status accept function
    const statusAcceptRequestDatabase = async () => {
      const res = await axiosSecure.patch(
        `/status-accept-request/${studySessionAcceptId}`,
        studySessionUpdatedData
      );
      const resData = await res.data;

      if (resData.modifiedCount > 0) {
        setAcceptStatusModal(false);
        refetch();
        Swal.fire({
          title: "Request Accepted Successfully",
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

    if (!fee || fee === 0) {
      Swal.fire({
        title: "Are You Sure!",
        text: "Session Fee is 0",
        icon: "info",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "#5c6bc0",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          statusAcceptRequestDatabase();
        }
      });
      return;
    } else if (fee) {
      statusAcceptRequestDatabase();
    }
  };

  const onReject = (rejectedResonAndFeedback) => {
    const rejectReson = rejectedResonAndFeedback.rejectionReson;
    const rejectFeedback = rejectedResonAndFeedback.rejectionFeedback;
    const rejectedResonAndFeedbackData = {
      studySessionId: studySessionRejectId,
      rejectReson,
      rejectFeedback,
    };

    // status reject function
    const statusRejectRequestDatabase = async () => {
      const res = await axiosSecure.patch(
        `/status-reject-request/${studySessionRejectId}`
      );
      const resData = await res.data;
      if (resData.modifiedCount > 0) {
        refetch();
        setRejectStatusModal(false);
        Swal.fire({
          title: "Request Rejected Successfully",
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

    // reject reson and feedback send database

    const sendRejectResonAndFeedback = async () => {
      const res = await axiosSecure.post(
        `/study-session-reject-reson-feedback`,
        rejectedResonAndFeedbackData
      );
      const resData = await res.data;
      if (resData.insertedId) {
        statusRejectRequestDatabase();
      } else {
        Swal.fire({
          title: "An error occurred!",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
    sendRejectResonAndFeedback();
  };
  return (
    <>
      <Helmet>
        <title>EduCollaborate | Dashboard | All Study Session</title>
      </Helmet>
      <section className="space-y-8 overflow-hidden">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-primary"}
            secondCls={"text-black"}
            firstName={"All"}
            secondName={"Study Session"}
            description={
              "This article will guide you through accessing and viewing all your study sessions, including those created by both tutors and admins. Whether you're a student seeking a comprehensive overview of your study schedule or an educator monitoring student progress, this guide will equip you with the knowledge to navigate your study session history effectively."
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
        <div className="flex justify-center items-center gap-x-3">
          <h2 className="text-2xl font-medium text-primary ">
            All Study Session:
          </h2>

          <span className="px-3 py-1 text-lg font-bold text-primary bg-blue-200 rounded-full  ">
            {allStudySession?.resDataLength}
          </span>
        </div>
        {/* study session pending */}
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">
            Pending Study Session:
          </h2>

          <span className="px-3 py-1 text-xs font-bold text-primary bg-blue-200 rounded-full  ">
            {allStudySession?.statusPending?.length}
          </span>
        </div>
        {allStudySession?.statusPending?.length > 0 ? (
          <>
            {/* study session pending table */}
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-gray-50 ">
                        <tr className="*:font-bold">
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Session Title - Image</span>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Tutor Name
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Tutor Email address
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Action Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200  ">
                        {allStudySession?.statusPending?.map(
                          (studySessionData, ind) => {
                            const {
                              _id,
                              image,
                              sessionTitle,
                              status,
                              tutorName,
                              tutorEmail,
                            } = studySessionData;

                            return (
                              <tr key={ind}>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-primary ring-1 ring-primary rounded-full size-3 flex justify-center items-center p-3">
                                      {ind + 1}
                                    </span>

                                    <div className="flex items-center gap-x-2">
                                      <img
                                        className="object-cover size-16 rounded-md "
                                        src={image}
                                        alt=""
                                      />
                                      <div>
                                        <h2 className="font-medium text-gray-800 ">
                                          {sessionTitle}
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                  {tutorName}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                  {tutorEmail}
                                </td>

                                <td className="px-4 py-4 text-sm text-red-500  whitespace-nowrap capitalize">
                                  {status}
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  {status == "pending" && (
                                    <div className="flex flex-col gap-3">
                                      <div
                                        onClick={() => {
                                          handleStatusAccept(_id);
                                        }}
                                        className={`cursor-pointer flex items-center space-x-2 justify-center px-3 py-1 text-[15px] text-green-500 my-transition rounded-full  bg-green-100/60 hover:bg-green-500/50 hover:text-black`}
                                      >
                                        <span>Accept</span>
                                      </div>
                                      <div
                                        onClick={() => {
                                          handleStatusReject(_id);
                                        }}
                                        className={`cursor-pointer flex items-center space-x-2 justify-center px-3 py-1 text-[15px] text-red-500 my-transition rounded-full  bg-red-100/60 hover:bg-red-500/50 hover:text-black`}
                                      >
                                        <span>Reject</span>
                                      </div>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="text-red-500 flex justify-center text-center font-medium">
              No Study Session Pending!
            </span>
          </>
        )}
        {/* study session success */}
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">
            Accept Study Session:
          </h2>

          <span className="px-3 py-1 text-xs font-bold text-primary bg-blue-200 rounded-full  ">
            {allStudySession?.statusSuccess?.length}
          </span>
        </div>
        {allStudySession?.statusSuccess?.length > 0 ? (
          <>
            {/* study session success table */}
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-gray-50 ">
                        <tr className="*:font-bold">
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Session Title - Image</span>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Tutor Name
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Tutor Email address
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Action Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200  ">
                        {allStudySession?.statusSuccess?.map(
                          (studySessionData, ind) => {
                            const {
                              image,
                              sessionTitle,
                              status,
                              tutorName,
                              tutorEmail,
                            } = studySessionData;

                            return (
                              <tr key={ind}>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-primary ring-1 ring-primary rounded-full size-3 flex justify-center items-center p-3">
                                      {ind + 1}
                                    </span>

                                    <div className="flex items-center gap-x-2">
                                      <img
                                        className="object-cover size-16 rounded-md "
                                        src={image}
                                        alt=""
                                      />
                                      <div>
                                        <h2 className="font-medium text-gray-800 ">
                                          {sessionTitle}
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                  {tutorName}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                  {tutorEmail}
                                </td>

                                <td className="px-4 py-4 text-sm text-green-500  whitespace-nowrap capitalize">
                                  {status}
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div
                                    className={` flex items-center space-x-2 justify-center px-3 py-1 text-[15px] text-green-500 rounded-full bg-green-100/60  `}
                                  >
                                    <span>Already Success</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <span className="text-red-500 flex justify-center text-center font-medium">
              No Study Session Success!
            </span>
          </>
        )}
        {/*  study session rejectd  */}
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">
            Rejected Study Session:
          </h2>

          <span className="px-3 py-1 text-xs font-bold text-primary bg-blue-200 rounded-full  ">
            {allStudySession?.statusReject?.length}
          </span>
        </div>
        {allStudySession?.statusReject?.length > 0 ? (
          <>
            {/*  study session rejectd table */}
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-gray-50 ">
                        <tr className="*:font-bold">
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            <div className="flex items-center gap-x-3">
                              <span>Session Title - Image</span>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Tutor Name
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Tutor Email address
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            Action Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200  ">
                        {allStudySession?.statusReject?.map(
                          (studySessionData, ind) => {
                            const {
                              image,
                              sessionTitle,
                              status,
                              tutorName,
                              tutorEmail,
                            } = studySessionData;

                            return (
                              <tr key={ind}>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-primary ring-1 ring-primary rounded-full size-3 flex justify-center items-center p-3">
                                      {ind + 1}
                                    </span>

                                    <div className="flex items-center gap-x-2">
                                      <img
                                        className="object-cover size-16 rounded-md "
                                        src={image}
                                        alt=""
                                      />
                                      <div>
                                        <h2 className="font-medium text-gray-800 ">
                                          {sessionTitle}
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                  {tutorName}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                  {tutorEmail}
                                </td>

                                <td className="px-4 py-4 text-sm text-red-500  whitespace-nowrap capitalize">
                                  {status}
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div
                                    className={` flex items-center space-x-2 justify-center px-3 py-1 text-[15px] text-red-500 rounded-full bg-red-100/60  `}
                                  >
                                    <span>Already Rejected</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <span className="text-red-500 flex justify-center text-center font-medium">
              No Study Session Reject!
            </span>
          </>
        )}
        {acceptStatusModal && (
          <div className="my-transition fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex justify-center items-center p-8 z-[999] shadow-lg shadow-primary  w-full md:max-w-2xl md:mx-auto rounded-md flex-col ">
            <h2 className="font-semibold text-center mb-4 text-2xl text-primary">
              Provide Session Fee & Max Participants Student
            </h2>
            <AcceptStudySessionModal
              onAccept={onAccept}
              setAcceptStatusModal={setAcceptStatusModal}
            ></AcceptStudySessionModal>
            <div
              onClick={() => {
                setAcceptStatusModal(false);
              }}
              className="absolute top-4 right-4 p-3 cursor-pointer bg-red-100/50 rounded-full"
            >
              <AiOutlineClose className=" text-xl text-red-500"></AiOutlineClose>
            </div>
          </div>
        )}
        {rejectStatusModal && (
          <div className="my-transition fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex justify-center items-center p-8 z-[999] shadow-lg shadow-primary  w-full md:max-w-2xl md:mx-auto rounded-md flex-col ">
            <h2 className="font-semibold text-center mb-4 text-2xl text-primary">
              Provide Rejection Reson & Feedback
            </h2>
            <RejectStudySessionModal
              onReject={onReject}
              setAcceptStatusModal={setAcceptStatusModal}
            ></RejectStudySessionModal>
            <div
              onClick={() => {
                setRejectStatusModal(false);
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

export default AllStudySession;
