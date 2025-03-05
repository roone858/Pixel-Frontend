
const plans = [
  {
    name: "اساسى",
    price: "$50",
    period: "/شهر",
    description: "You just want to discover",
    features: ["10 Credits", "Generate video (2 credits)", "Quizz (1 credit)"],
    buttonText: "اشترك الان",
    buttonLink: "plans/price_1QxpH9DLQcvajEnuI0XqHpeL",
    isPopular: false,
  },
  {
    name: "محترف",
    price: "$400",
    period: "/شهر",
    description: "You just want to discover",
    features: ["10 Credits", "Generate video (2 credits)", "Quizz (1 credit)"],
    buttonText: "اشترك الان",
    buttonLink: "plans/price_1QxpHuDLQcvajEnuPw7RaKn9",
    isPopular: false,
  },
  {
    name: "مميز",
    price: "$600",
    period: "/شهر",
    description: "You want to learn and have a personal assistant",
    features: [
      "30 Credits",
      "Powered by GPT-4 (more accurate)",
      "Generate video (2 credits)",
      "Quizz (1 credit)",
      "Analytics on the quizz",
    ],
    buttonText: "اشترك الان",
    buttonLink: "plans/price_1QxpIgDLQcvajEnuNmtclWgQ",
    isPopular: true,
  },
];

const Pricing = () => {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-center mt-12 sm:text-5xl">
          خطط الاسعار
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-xl text-center">
          Get started on our free plan and upgrade when you are ready.
        </p>
      </div>
      <div className="mt-24 px-10 pb-10 container gap-5 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              {plan.isPopular && (
                <p className="absolute top-0 py-1.5 px-4 bg-orange-500  text-white rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
                  الاكثر شيوعا
                </p>
              )}
              <p className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                <span className="ml-1 text-xl font-semibold">
                  {plan.period}
                </span>
              </p>
              <p className="mt-6">{plan.description}</p>
              <ul className="mt-6 space-y-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 w-6 h-6 text-emerald-500"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                plan.isPopular
                  ?  "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-orange-50 text-orange-600 hover:bg-orange-100"
              }`}
              href={plan.buttonLink}
            >
              {plan.buttonText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
