import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import DataLoader from "./../../../shared/data_loader/DataLoader";
import ErrorDataImage from "./../../../shared/error_data_image/ErrorDataImage";
import SectionTitle from "./../../../shared/section_title/SectionTitle";
import AllTutorCart from "./AllTutorCart";
function AllTutor() {
  const axiosPublic = useAxiosPublic();
  const {
    isPending,
    error,
    data: allTutor = [],
  } = useQuery({
    queryKey: ["allTutor"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-tutor");
      const resData = await res.data;
      return resData;
    },
  });
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-center text-center flex-col space-y-3">
          <SectionTitle
            firstCls={"text-black"}
            secondCls={"text-primary"}
            firstName={"All"}
            secondName={"Tutor"}
            description={
              "Meet our team of expert tutors who are here to help you succeed."
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
        {allTutor.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {allTutor.map((tutor, ind) => {
              return <AllTutorCart tutor={tutor} key={ind}></AllTutorCart>;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default AllTutor;
