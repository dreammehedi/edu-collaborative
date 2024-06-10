import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaCcVisa } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Button from "../shared/button/Button";
import useAxiosSecure from "./../hooks/useAxiosSecure";

function CheckOutForm({ studySessionData }) {
  // navigate
  const navigate = useNavigate();

  // client secret
  const [clientSecret, setClientSecret] = useState("");

  // processing payment status
  const [processingPayment, setProcessingPayment] = useState(false);

  // payment submit error
  const [paymentSubmitError, setPaymentSubmitError] = useState(null);

  // axios secure instance
  const axiosSecure = useAxiosSecure();

  // user data
  const { user } = useAuth();

  // get payment client secret
  useEffect(() => {
    const paymentIntent = async () => {
      const res = await axiosSecure.post("/create-payment-intent", {
        fee: studySessionData?.fee,
      });
      const resData = await res.data;
      setClientSecret(resData.clientSecret);
    };
    paymentIntent();
  }, [axiosSecure, studySessionData?.fee]);

  const stripe = useStripe();
  const elements = useElements();

  //   handle payment submit
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessingPayment(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentSubmitError(error.message);
      setProcessingPayment(false);
      return;
    } else {
      setPaymentSubmitError(null);
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      setPaymentSubmitError(confirmError.message);
      setProcessingPayment(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // stydy session all info
      const studySessionBookedFn = async () => {
        const { _id: studySessionId, ...studySessionCopy } = studySessionData;
        const studySessionBookedData = {
          studentName: user?.displayName,
          studentEmail: user?.email,
          studentImage: user?.photoURL,
          studySessionId,
          ...studySessionCopy,
          transitionId: paymentIntent?.id,
          paymentDate: new Date(),
        };
        try {
          const response = await axiosSecure.post(
            "/study-session-booked",
            studySessionBookedData
          );
          const data = await response.data;
          if (data.insertedId) {
            Swal.fire({
              title: "Payment Successful",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/view-booked-session");
          }
        } catch (error) {
          Swal.fire({
            title: "An error occurred!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      };
      studySessionBookedFn();
      setPaymentSubmitError(null);
      setProcessingPayment(false);
    }
  };
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
            <form
              onSubmit={handlePaymentSubmit}
              className="mt-8 border p-4 rounded-md border-slate-300"
            >
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#5c6bc0",
                      "::placeholder": {
                        color: "#7986cv",
                      },
                    },
                    invalid: {
                      color: "#5c6bc0",
                    },
                  },
                }}
              />

              <button
                type="submit"
                disabled={!stripe || !clientSecret || processingPayment}
                className="bg-primary px-3 py-1 rounded-md text-white cursor-pointer mt-3 my-transition hover:bg-primary-main flex items-center gap-2"
              >
                Pay ${studySessionData?.fee}{" "}
                <ImSpinner9
                  className={processingPayment && "animate-spin"}
                ></ImSpinner9>
              </button>
            </form>
            {paymentSubmitError && (
              <span className="font-roboto text-xs text-red-500 font-medium">
                {" "}
                {paymentSubmitError}
              </span>
            )}

            <div className="pt-4 ml-4">
              <Link to={"/"}>
                <Button name={"Pay Later"}></Button>
              </Link>
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
