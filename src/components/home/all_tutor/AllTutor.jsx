import SectionTitle from "./../../../shared/section_title/SectionTitle";
import AllTutorCart from "./AllTutorCart";
function AllTutor() {
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <AllTutorCart></AllTutorCart>
        </div>
      </div>
    </section>
  );
}

export default AllTutor;
