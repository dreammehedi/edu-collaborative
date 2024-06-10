import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PK_KEY);

function Payment() {
  const { state } = useLocation();

  return (
    <>
      <section className="py-12">
        <div className="lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4">
          <Elements stripe={stripePromise}>
            <CheckOutForm studySessionData={state}></CheckOutForm>
          </Elements>
        </div>
      </section>
    </>
  );
}

export default Payment;
