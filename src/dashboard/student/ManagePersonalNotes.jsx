import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdateStudentCreateNoteModal from "../../modal/UpdateStudentCreateNoteModal";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";
import ManagePersonalNoteCart from "./ManagePersonalNoteCart";

function ManagePersonalNotes() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // update modal toggle
  const [updateCreateNoteModal, setUpdateCreateNoteModal] = useState(false);
  const [updatePersonalNoteCartId, setUpdatePersonalNoteCartId] = useState("");

  const {
    isPending,
    error,
    refetch,
    data: managePersonalNote = [],
  } = useQuery({
    queryKey: ["managePersonalNote"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student-personal-note/${user.email}`);
      const data = await res.data;
      return data;
    },
  });

  // on Update student created note form handle
  const onUpdate = async (data) => {
    const res = await axiosSecure.patch(
      `/update-create-note/${updatePersonalNoteCartId}`,
      data
    );
    const resData = await res.data;
    if (resData.modifiedCount > 0) {
      Swal.fire({
        title: "Note Updated Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setUpdateCreateNoteModal(false);
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
        <title>EduCollaborate | Dashboard | Manage Personal Note</title>
      </Helmet>
      <section className="space-y-8">
        <div className="flex w-full md:max-w-2xl md:mx-auto justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"Manage Your"}
            secondName={"Personal Note"}
            description={
              "A space to track my progress in personal development activities, such as skill-building, mindfulness practices, and self-improvement exercises.A space to track my progress in personal development activities, such as skill-building, mindfulness practices, and self-improvement exercises."
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

        {managePersonalNote.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-8">
            {managePersonalNote.map((manageNote, ind) => {
              return (
                <ManagePersonalNoteCart
                  key={ind}
                  manageNote={manageNote}
                  dataRefetch={refetch}
                  setUpdateCreateNoteModal={setUpdateCreateNoteModal}
                  setUpdatePersonalNoteCartId={setUpdatePersonalNoteCartId}
                ></ManagePersonalNoteCart>
              );
            })}
          </div>
        )}

        {updateCreateNoteModal && (
          <div className="my-transition fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex justify-center items-center p-8 z-[999] shadow-lg shadow-primary  w-full md:max-w-2xl md:mx-auto rounded-md flex-col ">
            <h2 className="font-semibold text-center mb-4 text-2xl text-primary">
              Update Personal Note
            </h2>
            <UpdateStudentCreateNoteModal
              onUpdate={onUpdate}
              setUpdateCreateNoteModal={setUpdateCreateNoteModal}
            ></UpdateStudentCreateNoteModal>
            <div
              onClick={() => {
                setUpdateCreateNoteModal(false);
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

export default ManagePersonalNotes;
