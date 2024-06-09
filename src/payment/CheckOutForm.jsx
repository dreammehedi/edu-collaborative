import PropTypes from "prop-types";
import { FaCcVisa } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../shared/button/Button";

function CheckOutForm({ studySessionData }) {
  console.log(studySessionData);
  return (
    <>
      <div className="bg-gradient-to-br from-gray-200 to-gray-100 p-6 w-full max-w-5xl max-lg:max-w-xl mx-auto rounded-md">
        <h2 className="text-3xl font-extrabold text-primary text-center">
          Checkout
        </h2>

        <div className="grid lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-md  h-fit">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {studySessionData?.sessionTitle}
            </h3>
            <img
              className="rounded-md w-full h-[150px]"
              src={studySessionData?.image}
              alt=""
            />
            <ul className="text-gray-800 mt-4 space-y-2">
              <hr />
              <li className="flex flex-wrap gap-4 text-base font-bold">
                Fee <span className="ml-auto">${studySessionData?.fee}</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              {" "}
              <h2>Pay for </h2>
              <FaCcVisa className="text-4xl text-primary"></FaCcVisa>
            </div>
            <form className="mt-8">
              <div className="grid sm:col-span-2 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name of card holder"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                />
                <input
                  type="number"
                  placeholder="Postal code"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                />
                <input
                  type="number"
                  placeholder="Card number"
                  className="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                />
                <input
                  type="number"
                  placeholder="EXP."
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                />
                <input
                  type="number"
                  placeholder="CVV"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                />
              </div>
            </form>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to={"/"}>
                <button
                  type="button"
                  className="px-6 py-3.5 text-sm bg-white hover:bg-gray-50 text-gray-800 rounded-md"
                >
                  Pay later
                </button>
              </Link>
              <div>
                <Button name={"Pay"}></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CheckOutForm.propTypes = {
  studySessionData: PropTypes.object.isRequired,
};
export default CheckOutForm;
