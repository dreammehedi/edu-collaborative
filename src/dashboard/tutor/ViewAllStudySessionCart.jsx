import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../../shared/button/Button";

function ViewAllStudySessionCart({ viewStudySession, handlePendingRequest }) {
  const {
    _id,
    image,
    sessionTitle,
    sessionDescription,
    fee,
    status,
    registrationStartDate,
    registrationEndDate,
    classStartTime,
    classEndTime,
    sessionDuration,
  } = viewStudySession;

  return (
    <>
      <div className="shadow-md p-4 h-fit">
        <img
          className="w-full h-[280px] md:h-[300px] rounded-md object-cover"
          src={image}
          alt=""
        />

        <div className="mt-4 space-y-3">
          <h3 className="text-primary font-bold text-xl">{sessionTitle}</h3>
          <p>{sessionDescription}</p>
          <div className="flex flex-col space-y-3">
            <button className="ring-1 ring-orange-500 font-medium px-4 py-1 rounded-full text-orange-500 flex items-center gap-2">
              <p>Registration Start Time:</p> {registrationStartDate}
            </button>{" "}
            <button className="ring-1 ring-orange-500 font-medium px-4 py-1 rounded-full text-orange-500 flex items-center gap-2">
              <p>Registration End Time:</p> {registrationEndDate}
            </button>{" "}
            <button className="ring-1 ring-pink-500 font-medium px-4 py-1 rounded-full text-pink-500 flex items-center gap-2">
              <p>Class Start Time:</p> {classStartTime}
            </button>{" "}
            <button className="ring-1 ring-pink-500 font-medium px-4 py-1 rounded-full text-pink-500 flex items-center gap-2">
              <p>Class End Time:</p> {classEndTime}
            </button>
            <button className="ring-1 ring-primary font-medium px-4 py-1 rounded-full text-primary flex items-center gap-2">
              <p>Session Duration:</p> {sessionDuration}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <h5 className="ring-1 ring-teal-500 font-medium px-4 py-1 rounded-full text-teal-500 flex items-center  gap-2">
              <p>Fee: $</p> {fee}
            </h5>
            {status === "success" && (
              <h5 className="ring-1 ring-green-500 font-medium px-4 py-1 rounded-full text-green-500 flex items-center gap-2">
                <p>Status: </p> {status}
              </h5>
            )}
            {status === "pending" && (
              <h5 className="ring-1 ring-primary-main font-medium px-4 py-1 rounded-full text-primary-main  flex items-center  gap-2">
                <p>Status: </p> {status}
              </h5>
            )}
            {status === "rejected" && (
              <h5 className="ring-1 ring-red-500 font-medium px-4 py-1 rounded-full text-red-500  flex items-center  gap-2">
                <p>Status: </p> {status}
              </h5>
            )}
          </div>
          {status === "success" && (
            <>
              <p className="text-green-500 font-medium font-roboto">
                Your study session request has been success.
              </p>
            </>
          )}

          {status === "pending" && (
            <>
              <p className="text-primary-main font-medium font-roboto">
                Your study session request has been pending.
              </p>
            </>
          )}
          {status === "rejected" && (
            <div className="space-y-3">
              <p className="text-red-500 font-medium font-roboto">
                Your study session request has been rejected.
              </p>
              <Link to={`/dashboard/view-rejected-reson-feedback/${_id}`}>
                <Button name={"View Rejected Reason & Feedback"}></Button>
              </Link>
              <div className="flex justify-start gap-3 items-center">
                <p className="text-black font-medium font-roboto">
                  Please Send Request Again:
                </p>
                <div
                  onClick={() => {
                    handlePendingRequest(_id);
                  }}
                >
                  <Button name={"Request"}></Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
ViewAllStudySessionCart.propTypes = {
  viewStudySession: PropTypes.object,
  handlePendingRequest: PropTypes.func,
};
export default ViewAllStudySessionCart;
