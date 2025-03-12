import React from "react";
import { Link } from "react-router-dom";
import withEmailConfirmed from "../../HOC/withEmailConfirmed";

const EmailConfirmedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <svg
          className="w-16 h-16 mx-auto text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>

        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          تم تأكيد البريد الإلكتروني بنجاح!
        </h1>

        <p className="text-gray-600 mt-2">
          يمكنك الآن الاستفادة من جميع المميزات.
        </p>

        <Link
          to="/"
          className="mt-4 inline-block bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};
const ProtectedPage = withEmailConfirmed(EmailConfirmedPage);
export default ProtectedPage;
