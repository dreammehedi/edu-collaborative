import moment from "moment";
import PropTypes from "prop-types";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../../shared/button/Button";

function StudySessionCart({ studySession }) {
  const {
    _id,
    sessionTitle,
    tutorName,
    fee,
    sessionDescription,
    registrationStartDate,
    registrationEndDate,
    image,
  } = studySession;

  // current date
  const currentDate = moment().format();

  const isRegistrationEnd =
    moment(registrationEndDate).isSameOrAfter(currentDate);

  return (
    <>
      <div className="space-y-3 p-4 rounded-md hover:shadow-md ring-1 ring-slate-200 my-transition h-fit">
        <img
          className="object-cover w-full h-[300px] md:h-[250px] lg:h-[280px] rounded-md"
          src={image}
          alt=""
        />
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-medium text-primary">{tutorName}</span>
            <span className="font-medium text-primary">${fee}</span>
          </div>
          <h2 className="font-bold text-2xl">{sessionTitle}</h2>
          <p className="text-sm ">{sessionDescription.slice(0, 200)}...</p>
          <p className="font-medium font-roboto">
            Registration Start Date:{" "}
            <span className="text-[15px] text-slate-500">
              {registrationStartDate}
            </span>
          </p>
          <p className="font-medium font-roboto">
            Registration End Date:{" "}
            <span className="text-[15px] text-slate-500">
              {registrationEndDate}
            </span>
          </p>
          <div className="flex justify-between items-center !mt-6 text-sm *:px-4 *:py-1">
            <span
              className={`${
                isRegistrationEnd ? "bg-primary" : "bg-primary-main"
              } text-white font-medium rounded-md !px-4 !py-3`}
            >
              {isRegistrationEnd ? "Ongoing" : "Closed"}
            </span>

            <Link to={`study-session-detailes/${_id}`}>
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
StudySessionCart.propTypes = {
  studySession: PropTypes.object.isRequired,
};
export default StudySessionCart;
