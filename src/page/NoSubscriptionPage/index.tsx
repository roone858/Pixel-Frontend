import React from "react";
import { Link } from "react-router-dom";

const NoSubscriptionPage: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <img
          src="https://cdn.pixabay.com/photo/2024/02/05/02/53/cat-8553498_1280.jpg" // رابط الصورة
          alt="No Subscription"
          className="w-40 h-40 mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-orange-500 mb-6">
          أنت غير مشترك في أي خطة
        </h1>
        <p className="text-gray-700 mb-6">
          يبدو أنك غير مشترك في أي خطة حالية. يمكنك استكشاف الخطط المتاحة
          والاشتراك للاستفادة من جميع المميزات.
        </p>

        {/* أزرار الإجراءات */}
        <div className="flex space-x-4 justify-center">
          <Link
            to="/plans" // رابط لصفحة الخطط
            className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300"
          >
            استكشاف الخطط
          </Link>
          <Link
            to="/" // رابط للصفحة الرئيسية
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoSubscriptionPage;
