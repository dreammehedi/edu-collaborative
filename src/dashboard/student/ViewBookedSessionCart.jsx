import PropTypes from "prop-types";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "./../../shared/button/Button";

function ViewBookedSessionCart({ viewStudentBookedSession }) {
  const { _id, image, tutorName, fee, sessionTitle, sessionDescription } =
    viewStudentBookedSession;
  return (
    <>
      <div className="space-y-3 p-4 rounded-md hover:shadow-md ring-1 ring-slate-200 my-transition">
        <img className="object-cover w-full h-[300px]" src={image} alt="" />
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-primary">{tutorName}</span>
            <span className="font-medium text-primary">${fee}</span>
          </div>
          <h2 className="font-bold text-2xl">{sessionTitle}</h2>
          <p className="text-sm ">{sessionDescription}</p>
          <div>
            <Link to={`/dashboard/view-booked-session-detailes/${_id}`}>
              <Button name="Read More">
                <FaArrowAltCircleRight className="relative z-10"></FaArrowAltCircleRight>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
ViewBookedSessionCart.propTypes = {
  viewStudentBookedSession: PropTypes.object,
};
export default ViewBookedSessionCart;
