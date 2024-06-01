import Button from "../../../shared/button/Button";

function StudySessionCart() {
  return (
    <>
      <div className="space-y-3 p-4 rounded-md hover:shadow-md ring-1 ring-slate-200 my-transition">
        <img
          src="https://img.freepik.com/free-photo/colleagues-studying-together-exam_23-2149038439.jpg?t=st=1717249717~exp=1717253317~hmac=d33ba36bb9487bd6eabb0a7fa2ed32ee0650dcfe823821c0fb9a617bcdc51476&w=740"
          alt=""
        />
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-medium text-primary">John Smith</span>
            <span className="font-medium text-primary">$40</span>
          </div>
          <h2 className="font-bold text-2xl">Advanced Calculus Study Group</h2>
          <p className="text-sm ">
            Join our advanced calculus study group to master complex concepts
            and problem-solving techniques. Guided by our expert tutor, John
            Smith, this session is ideal for students looking to excel in
            calculus.
          </p>
          <div className="text-sm *:px-4 *:py-1">
            <Button name="Read More"></Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudySessionCart;
