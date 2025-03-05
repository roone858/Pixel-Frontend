// PaymentComponent.js
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm";
import { useState } from "react";
import SubscriptionPaymentSuccess from "../PaymentConfirmation";
// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY || "");
const stripePromise = loadStripe(
  "pk_test_51OM8bHDLQcvajEnuuNf6qIKGtgejp1tBjhQzN5NlcjErrePK9prFIVrJNiSuJ39RhrFtZo1EU1gy1WLqLL9TORWT00hoBBBcZ5"
);

const Stripe = ({ priceId }: { priceId: string }) => {
  const [showConfirmation, setShowConfirmation] = useState(false); // Toggle StripeCheckout

  if (showConfirmation) {
    return (
      priceId && <SubscriptionPaymentSuccess subscriptionPlan={"priceId"} />
    );
  }
  return (
    <div className="py-16 bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="w-full  lg:w-1/2 p-8">
          <Elements
            options={{
              locale: "ar",
            }}
            stripe={stripePromise}
          >
            <CheckoutForm
              setShowConfirmation={setShowConfirmation}
              priceId={priceId}
            />
          </Elements>
        </div>
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
          className="hidden lg:block lg:w-1/2 bg-cover"
        ></div>
      </div>
    </div>
  );
};

export default Stripe;
