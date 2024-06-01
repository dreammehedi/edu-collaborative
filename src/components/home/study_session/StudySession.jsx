import SectionTitle from "../../../shared/section_title/SectionTitle";
import StudySessionCart from "./StudySessionCart";

function StudySession() {
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <StudySessionCart></StudySessionCart>
        </div>
      </div>
    </section>
  );
}

export default StudySession;
