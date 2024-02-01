import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("01");
  const [expiryYear, setExpiryYear] = useState("2022");
  const [cvc, setCvc] = useState("");

  const handleCardNumberChange = (event) => {
    const newCardNumber = event.target.value;
    setCardNumber(newCardNumber);
    updateCardElement();
  };

  const handleExpiryMonthChange = (event) => {
    const newExpiryMonth = event.target.value;
    setExpiryMonth(newExpiryMonth);
    updateCardElement();
  };

  const handleExpiryYearChange = (event) => {
    const newExpiryYear = event.target.value;
    setExpiryYear(newExpiryYear);
    updateCardElement();
  };

  const handleCvcChange = (event) => {
    const newCvc = event.target.value;
    setCvc(newCvc);
    updateCardElement();
  };

  const updateCardElement = () => {
    if (elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.update({
          value: {
            cardNumber,
            exp_month: expiryMonth,
            exp_year: expiryYear,
            cvc,
          },
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet, or elements is not ready
      return;
    }
    // Validate the form fields here if needed
    const element = elements.getElement(CardElement);
    console.log(element);
    if (!element) return;
    const { token, error } = await stripe.createToken(element, {
      name,
    });

    if (error) {
      console.error("Error creating token:", error);
    } else {
      console.log("Token:", token);
      const res = await axios.post("http://localhost:3000/payments", {
        payment_method_data: {
          type: "card",
          card: {
            token: token.id, // Assuming stripeToken is the object received from Stripe.js
          },
        },
        amount: 100,
      });
      console.log(res);
    }
  };
  return (
    <>
      <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
        <div
          className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
          style={{ maxWidth: "600px" }}
        >
          <div className="w-full pt-1 pb-5">
            <div className="bg-orange-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i className="mdi mdi-credit-card-outline text-3xl"></i>
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Secure payment info
            </h1>
          </div>
          <div className="mb-3 flex -mx-2">
            <div className="px-2">
              <label
                htmlFor="type1"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-orange-500"
                  name="type"
                  id="type1"
                  defaultChecked
                />
                <img
                  src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                  className="h-8 ml-3"
                  alt="Type 1"
                />
              </label>
            </div>
            <div className="px-2">
              <label
                htmlFor="type2"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-orange-500"
                  name="type"
                  id="type2"
                />
                <img
                  src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                  className="h-8 ml-3"
                  alt="Type 2"
                />
              </label>
            </div>
          </div>
          <div>
            {/* <CardElement /> */}
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white rounded-md p-2 px-4 my-2"
            >
              Pay
            </button>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">
              الاسم على البطاقة
            </label>
            <div>
              <input
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="John Smith"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">رقم البطاقة</label>
            <div>
              <input
                onChange={handleCardNumberChange}
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="0000 0000 0000 0000"
                type="text"
              />
            </div>
          </div>
          <div className="mb-3 -mx-2 flex items-end">
            <div className="px-2 w-1/2">
              <label className="font-bold text-sm mb-2 ml-1">
                تاريخ الانتهاء
              </label>
              <div>
                <select
                  onChange={handleExpiryMonthChange}
                  className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
                >
                  <option value="01">01 - January</option>
                  <option value="02">02 - February</option>
                  <option value="03">03 - March</option>
                  <option value="04">04 - April</option>
                  <option value="05">05 - May</option>
                  <option value="06">06 - June</option>
                  <option value="07">07 - July</option>
                  <option value="08">08 - August</option>
                  <option value="09">09 - September</option>
                  <option value="10">10 - October</option>
                  <option value="11">11 - November</option>
                  <option value="12">12 - December</option>
                </select>
              </div>
            </div>
            <div className="px-2 w-1/2">
              <select
                onChange={handleExpiryYearChange}
                className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
              >
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
          </div>
          <div className="mb-10">
            <label className="font-bold text-sm mb-2 ml-1">Security code</label>
            <div>
              <input
                onChange={handleCvcChange}
                className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="000"
                type="text"
              />
            </div>
          </div>
          <div>
            <button className="block w-full max-w-xs mx-auto bg-orange-500 hover:bg-orange-700 focus:bg-orange-700 text-white rounded-lg px-3 py-3 font-semibold">
              <i className="mdi mdi-lock-outline mr-1"></i> استكمال الدفع
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
