import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DataLoader from "../../shared/data_loader/DataLoader";
import ErrorDataImage from "../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "../../shared/section_title/SectionTitle";
import ManagePersonalNoteCart from "./ManagePersonalNoteCart";

function ManagePersonalNotes() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
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
                ></ManagePersonalNoteCart>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default ManagePersonalNotes;
