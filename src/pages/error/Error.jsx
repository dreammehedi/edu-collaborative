import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
function Error() {
  let navigate = useNavigate();

  return (
    <>
      <section className="bg-white ">
        <div className="container min-h-screen px-6 py-12 mx-auto flex justify-center items-center lg:items-center lg:justify-normal lg:flex-row lg:gap-12">
          <div className="hidden md:inline-block relative w-full mt-12 lg:w-1/2 lg:mt-0">
            <img
              className="w-full max-w-lg lg:mx-auto"
              src="https://i.ibb.co/B2dBSBp/page-found-concept-illustration-114360-1869.jpgg"
              alt=""
            />
          </div>
          <div className="flex flex-col space-y-3 justify-center items-center text-center w-full lg:w-1/2">
            <p className="text-base font-medium text-blue-500 ">404 Error</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500 ">
              {` Sorry, the page you are looking for doesn't exist. Here are some
              helpful links:`}
            </p>

            <div className="w-full flex flex-col items-center justify-center mt-6 gap-3">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100"
              >
                <FaArrowLeft></FaArrowLeft>
                <span>Go Back</span>
              </button>

              <Link to={"/"}>
                <button className="px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 ">
                  Take me Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error;
