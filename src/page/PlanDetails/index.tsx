import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stripe from "../Stripe";
import withAuth from "../../HOC/withAuth";
import { StoreContext } from "../../context/AuthContext copy";
import { PlanType } from "../../types";

const PlanDetails = () => {
  const params = useParams();
  const planId = params.id;
  const [showCheckout, setShowCheckout] = useState(false); // Toggle StripeCheckout
  const { plans } = useContext(StoreContext);
  const [plan, setPlan] = useState<PlanType>();

  useEffect(() => {
    setPlan(plans.find((p) => p._id == planId));
  }, [plans, planId, plan]);
  if (showCheckout) {
    return planId && <Stripe planId={planId} />;
  }
  return (
    <section className="py-24">
      <div className=" mx-auto px-10">
        <div className="flex flex-wrap mb-24 -mx-4">
          <div className="w-full lg:w-1/2 p-4">
            <div className="lg:px-8">
              <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                خطة واحدة تناسب الجميع
              </h2>
              <p className="text-gray-600 text-lg mb-4 max-w-md">
                خطة تسعير بسيطة تناسب الجميع بسعر فنجان قهوة.
              </p>
              <p className="text-gray-600 text-lg mb-10 max-w-md">
                نقدم اشتراكًا شهريًا شفافًا يشمل كل ما يوفره نظامنا التعليمي دون
                تكاليف مخفية أو رسوم إضافية.
              </p>
              <h2 className="text-lg font-bold font-heading mb-4">
                ما الذي ستحصل عليه ؟
              </h2>
              <ul className="flex flex-col gap-4">
                {[
                  "Join public room",
                  "Host events and virtual study club",
                  "Invite up to 100 people to learn together",
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="w-6 h-6 text-orange-500">✔</div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <div className="p-10 bg-orange-500 rounded-3xl text-white">
            <h2 className="text-xl lg:text-2xl font-bold font-heading mb-6">
                {plan?.price} جنية
              </h2>
              <h2 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                 خلال{plan?.period} أشهر
              </h2>
              <p className="mb-10">
                أكثر من 350 مستخدمًا مشتركين في هذه الخطة.
              </p>
              <div className="p-4 bg-orange-400 rounded-3xl flex items-center justify-between flex-wrap gap-4 mb-10">
                <p className="text-lg font-medium">الالغاء فى اى وقت</p>
                <a
                  className="w-full sm:w-auto h-14 text-center py-4 px-6 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-2"
                  href="#"
                >
                  <span
                    onClick={() => setShowCheckout(true)}
                    className="text-sm font-semibold text-black"
                  >
                    اشترك الان
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold font-heading mb-14">Pricing FAQs</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              question: "ما هى خيارات الدفع المتاحة ",
              answer: "You can pay by credit card, PayPal, or Stripe.",
            },
            {
              question: "هل هناك فترة تجريبية مجانية",
              answer:
                "Yes! We offer 14-days of trial. Free and no credit card required.",
            },
            {
              question: "ما هى خطط التسعير المتاحة",
              answer:
                "We only have one monthly subscription plan, costs no more than the price of a cup of coffee.",
            },
            {
              question: "لماذا الدفع شهريًا بدلاً من مرة واحدة؟",
              answer:
                "This is our way of keeping your costs low while giving you access to our platform level quality and peace of mind.",
            },
          ].map((faq, index) => (
            <div key={index} className="py-12 border-b border-gray-100">
              <h2 className="text-xl font-bold font-heading mb-2">
                {faq.question}
              </h2>
              <p className="text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const ProtectedComponent = withAuth(PlanDetails);
export default ProtectedComponent;
