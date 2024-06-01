import LearnInfoCart from "./LearnInfoCart";

function LearnInfo() {
  return (
    <section
      className="py-12 text-white w-full !bg-no-repeat !bg-center !bg-cover"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/diversity-teenager-team-seminar-training-education-concept_53876-146866.jpg?t=st=1717251751~exp=1717255351~hmac=d4db9893c4529220c4f31c1c0c40001071c8c446471a11d32e34dd1e7210015c&w=826')`,
      }}
    >
      <div className="container">
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <LearnInfoCart></LearnInfoCart>
          <LearnInfoCart></LearnInfoCart>
          <LearnInfoCart></LearnInfoCart>
          <LearnInfoCart></LearnInfoCart>
        </div>
      </div>
    </section>
  );
}

export default LearnInfo;
// https://htmldemo.net/study/study/img/bg/funfact.jpg
