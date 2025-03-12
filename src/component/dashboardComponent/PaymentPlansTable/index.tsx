import { FaEdit, FaTrash } from "react-icons/fa";
import { PlanType } from "../../../types";
import plansService from "../../../services/plans.service";
import { useStoreContext } from "../../../context/StoreContext";
import { useState } from "react";

const PaymentPlansTable = ({ plans }: { plans: PlanType[] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const { updatePlans } = useStoreContext();

  const openLightbox = (plan: PlanType) => {
    setSelectedPlan(plan);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedPlan(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (selectedPlan) {
      setSelectedPlan({
        ...selectedPlan,
        [name]: name === "price" || name === "period" ? Number(value) : value,
      });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (selectedPlan) {
      const updatedFeatures = [...selectedPlan.features];
      updatedFeatures[index] = value;
      setSelectedPlan({
        ...selectedPlan,
        features: updatedFeatures,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan = await plansService.update(selectedPlan);
    updatePlans(plans.map((p) => (p._id == newPlan._id ? newPlan : p)));
    closeLightbox();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">إدارة خطط الدفع</h2>
      <table className="w-full">
        <thead>
          <tr className="text-right border-b">
            <th className="pb-2">الاسم</th>
            <th className="pb-2">السعر</th>
            <th className="pb-2">المدة</th>
            <th className="pb-2">الميزات</th>
            <th className="pb-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {plans
            ?.sort((a, b) => +b.price - +a.price)
            .map((plan) => (
              <tr key={plan._id} className="border-b">
                <td className="py-3">{plan.name}</td>
                <td className="py-3">
                  {" "}
                  {plan.price.toLocaleString("ar-EG")} جنية
                </td>
                <td className="py-3">
                  {plan.period.toLocaleString("ar-EG")} أشهر
                </td>
                <td className="py-3">
                  <ul className="list-disc list-inside">
                    {plan.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-3">
                  <div className="relative flex gap-5">
                    <button
                      onClick={() => openLightbox(plan)}
                      className="text-blue-500 hover:text-blue-700 text-xl"
                    >
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700 text-xl">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {lightboxOpen && selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeLightbox}
        >
          <span
            className="absolute top-5 right-10 text-white text-4xl cursor-pointer"
            onClick={closeLightbox}
          >
            &times;
          </span>
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-bold mb-4">تعديل الخطة</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الاسم
                </label>
                <input
                  type="text"
                  name="name"
                  value={selectedPlan.name}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3  rounded-md mt-1  border  border-gray-300 focus:outline-none focus:border-orange-500 "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  السعر
                </label>
                <input
                  type="number"
                  name="price"
                  value={selectedPlan.price}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3  rounded-md mt-1  border  border-gray-300 focus:outline-none focus:border-orange-500 "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  المدة (أشهر)
                </label>
                <input
                  type="number"
                  name="period"
                  value={selectedPlan.period}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3  rounded-md mt-1  border  border-gray-300 focus:outline-none focus:border-orange-500 "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الميزات
                </label>
                {selectedPlan.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="w-full py-2 px-3  rounded-md mt-2  border  border-gray-300 focus:outline-none focus:border-orange-500 "
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeLightbox}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-md"
              >
                حفظ التغييرات
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentPlansTable;
