import { useState } from "react";
// import "./CheckoutForm.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

interface CheckoutFormProps {
  priceId: string;
  setShowConfirmation: (a: boolean) => void;
}

export default function CheckoutForm({
  priceId,
  setShowConfirmation,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setMessage("Stripe is not loaded yet. Please try again.");
      setIsLoading(false);
      return;
    }

    // Create payment method
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage("Card details are missing.");
      setIsLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setMessage(error.message || "An error occurred.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/subscription/create-subscription",
        {
          paymentMethodId: paymentMethod.id,
          planId: priceId,
          email,
          name,
        }
      );

      console.log(response.data);
      setShowConfirmation(true);
      setMessage("تم الاشتراك بنجاح ");
    } catch (err) {
      setMessage("Failed to create subscription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubscription}
      className="flex flex-col gap-4 gap-y-10 min-w-96"
    >
      <div className="text-3xl text-orange-500 font-bold  flex justify-center items-center pt-8">
        <svg className="h-10" viewBox="0 0 10240 10240">
          <path
            className="fill-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            d="M8284 9162 c-2 -207 -55 -427 -161 -667 -147 -333 -404 -644 -733 -886 -81 -59 -247 -169 -256 -169 -3 0 -18 -9 -34 -20 -26 -19 -344 -180 -354 -180 -3 0 -29 -11 -58 -24 -227 -101 -642 -225 -973 -290 -125 -25 -397 -70 -480 -80 -22 -3 -76 -9 -120 -15 -100 -13 -142 -17 -357 -36 -29 -2 -98 -7 -153 -10 -267 -15 -436 -28 -525 -40 -14 -2 -45 -7 -70 -10 -59 -8 -99 -14 -130 -20 -14 -3 -41 -7 -60 -11 -19 -3 -39 -7 -45 -8 -5 -2 -28 -6 -50 -10 -234 -45 -617 -165 -822 -257 -23 -10 -45 -19 -48 -19 -7 0 -284 -138 -340 -170 -631 -355 -1107 -842 -1402 -1432 -159 -320 -251 -633 -308 -1056 -26 -190 -27 -635 -1 -832 3 -19 7 -59 10 -89 4 -30 11 -84 17 -120 6 -36 12 -77 14 -91 7 -43 33 -174 39 -190 3 -8 7 -28 9 -45 6 -35 52 -221 72 -285 7 -25 23 -79 35 -120 29 -99 118 -283 189 -389 67 -103 203 -244 286 -298 75 -49 178 -103 196 -103 16 0 27 16 77 110 124 231 304 529 485 800 82 124 153 227 157 230 3 3 28 36 54 74 116 167 384 497 546 671 148 160 448 450 560 542 14 12 54 45 90 75 88 73 219 172 313 238 42 29 77 57 77 62 0 5 -13 34 -29 66 -69 137 -149 405 -181 602 -7 41 -14 82 -15 90 -1 8 -6 46 -10 83 -3 37 -8 77 -10 88 -2 11 -7 65 -11 122 -3 56 -8 104 -9 107 -2 3 0 12 5 19 6 10 10 8 15 -10 10 -34 167 -346 228 -454 118 -210 319 -515 340 -515 4 0 40 18 80 40 230 128 521 255 787 343 118 40 336 102 395 113 28 5 53 11 105 23 25 5 59 12 75 15 17 3 41 8 55 11 34 7 274 43 335 50 152 18 372 29 565 29 194 0 481 -11 489 -19 2 -3 -3 -6 -12 -6 -9 -1 -20 -2 -24 -3 -33 -8 -73 -16 -98 -21 -61 -10 -264 -56 -390 -90 -649 -170 -1243 -437 -1770 -794 -60 -41 -121 -82 -134 -93 l-24 -18 124 -59 c109 -52 282 -116 404 -149 92 -26 192 -51 220 -55 17 -3 64 -12 105 -21 71 -14 151 -28 230 -41 19 -3 46 -7 60 -10 14 -2 45 -7 70 -10 25 -4 56 -8 70 -10 14 -2 53 -7 88 -10 35 -4 71 -8 81 -10 10 -2 51 -6 92 -9 101 -9 141 -14 147 -21 3 -3 -15 -5 -39 -6 -24 0 -52 -2 -62 -4 -21 -4 -139 -12 -307 -22 -242 -14 -700 -7 -880 13 -41 4 -187 27 -250 39 -125 23 -274 68 -373 111 -43 19 -81 34 -86 34 -4 0 -16 -8 -27 -17 -10 -10 -37 -33 -59 -52 -166 -141 -422 -395 -592 -586 -228 -257 -536 -672 -688 -925 -21 -36 -43 -66 -47 -68 -4 -2 -8 -7 -8 -11 0 -5 -24 -48 -54 -97 -156 -261 -493 -915 -480 -935 2 -3 47 -21 101 -38 54 -18 107 -36 118 -41 58 -25 458 -138 640 -181 118 -27 126 -29 155 -35 14 -2 45 -9 70 -14 66 -15 137 -28 300 -55 37 -7 248 -33 305 -39 28 -3 84 -9 125 -13 163 -16 792 -8 913 12 12 2 58 9 102 15 248 35 423 76 665 157 58 19 134 46 170 60 86 33 344 156 348 166 2 4 8 7 13 7 14 0 205 116 303 184 180 126 287 216 466 396 282 281 511 593 775 1055 43 75 178 347 225 455 100 227 236 602 286 790 59 220 95 364 120 485 6 28 45 245 50 275 2 14 7 41 10 60 3 19 8 49 10 65 2 17 6 46 9 65 15 100 35 262 40 335 3 39 8 89 10 112 22 225 33 803 21 1043 -3 41 -7 129 -11 195 -3 66 -8 136 -10 155 -2 19 -6 76 -10 125 -3 50 -8 101 -10 115 -2 14 -6 57 -10 95 -7 72 -12 113 -20 175 -2 19 -7 55 -10 80 -6 46 -43 295 -51 340 -2 14 -9 54 -15 90 -5 36 -16 97 -24 135 -8 39 -17 84 -20 100 -12 68 -18 97 -50 248 -19 87 -47 204 -61 260 -14 56 -27 109 -29 117 -30 147 -232 810 -253 832 -4 4 -7 -23 -8 -60z"
          ></path>
        </svg>
        <span>بيكسل</span>
      </div>
      <p className="text-center text-2xl">برجاء ادخال بيانات البطاقة</p>
      <input
        className="w-full py-2 px-3 border-0 border-b  border-gray-300 focus:outline-none focus:border-orange-500 "
        type="name"
        id="name"
        placeholder="الاسم الموجود على البطاقة"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {/* Email Input */}
      <input
        className="w-full py-2 px-3 border-0 border-b  border-gray-300 focus:outline-none focus:border-orange-500 "
        type="email"
        id="email"
        placeholder="البريد الالكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {/* Card Element */}
      <CardElement
        options={{
          classes: {
            base: "w-full py-2 px-3 border-0 border-b  border-gray-300 focus:outline-none focus:border-orange-500 ",
          },
          hidePostalCode: true,
          iconStyle: "solid",
          style: {
            base: {
              color: "#32325d",
              fontSize: "16px",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#fa755a" },
          },
        }}
        id="payment-element"
      />{" "}
      {/* Payment Message */}
      {message && (
        <div className="bg-red-200 px-6 py-2  rounded-md text-lg flex items-center max-w-lg">
          <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 ml-3"
          >
            <path
              fill="currentColor"
              d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
            ></path>
          </svg>
          <span className="text-red-800"> {message} </span>
        </div>
      )}
      {/* Submit Button */}
      <button
        className="bg-orange-500 text-white py-4 px-8 rounded-md"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        {isLoading ? <div className="spinner" id="spinner"></div> : "ادفع الان"}
      </button>
    </form>
  );
}
