/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import subscriptionsService from "../../services/subscriptions.service";
import { StoreContext } from "../../context/AuthContext copy";
import NoSubscriptionPage from "../NoSubscriptionPage";
const PlanDetailsPage: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { plans } = useContext(StoreContext);
  useEffect(() => {
    setIsLoading(true);
    const fetchPlanDetails = async () => {
      const sub = await subscriptionsService.findOne();
      const plan = plans.find((p) => p._id == sub.planId);

      sub &&
        plan &&
        setCurrentPlan({
          ...plan,
          status: sub.status,
          createdAt: sub.createdAt,
        });
    };

    fetchPlanDetails();
    setIsLoading(false);
  }, [plans]);

  if (isLoading) return <div>جاري تحميل تفاصيل الخطة...</div>;
  if (!currentPlan) return <NoSubscriptionPage />;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-orange-500 mb-6">
          تفاصيل الخطة الحالية
        </h1>

        {/* تفاصيل الخطة */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            أنت الآن على:{" "}
            <span className="text-orange-500">{currentPlan?.name}</span>
          </h2>
          <p className="text-gray-700 mb-2">
            السعر:{" "}
            <span className="font-bold">
              {currentPlan?.price?.toLocaleString("ar-EG")} جنية
            </span>
          </p>
          <p className="text-gray-700 mb-2">
            حالة الاشتراك:{" "}
            <span className="font-bold">{currentPlan?.status}</span>
          </p>
          <p className="text-gray-700 mb-4">
            تاريخ التجديد القادم:{" "}
            <span className="font-bold">{currentPlan.createdAt}</span>
          </p>

          <h3 className="text-lg font-semibold mb-2">مميزات الخطة:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {currentPlan?.features?.map((feature: any, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex space-x-4">
          <Link
            to="/upgrade-plan" // رابط لصفحة ترقية الخطة
            className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300"
          >
            ترقية الخطة
          </Link>
          <button
            onClick={() => alert("تم إلغاء الاشتراك بنجاح")}
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300"
          >
            إلغاء الاشتراك
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsPage;
