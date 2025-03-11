import { SubscriptionType } from "../../../types";

const SubscriptionsTable = ({
  subscriptions,
}: {
  subscriptions: SubscriptionType[];
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-xl font-bold mb-4">إدارة الاشتراكات</h2>
    <table className="w-full">
      <thead>
        <tr className="text-right border-b">
          <th className="pb-2">المستخدم</th>
          <th className="pb-2">البريد الإلكتروني</th>
          <th className="pb-2">الخطة</th>
          <th className="pb-2">تاريخ الإنشاء</th>
          <th className="pb-2">الحالة</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions?.map((sub) => (
          <tr key={sub._id} className="border-b">
            <td className="py-3">{sub.user.name || "غير معرف"}</td>
            <td className="py-3">{sub.user.email || "غير معرف"}</td>
            <td>{sub.planName}</td>
            <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
            <td>
              <span
                className={
                  sub.status === "active"
                    ? "border text-sm font-medium bg-green-500 border-none rounded-full px-2 py-1"
                    : "border text-sm font-medium bg-gray-200 border-none rounded-full px-2 py-1"
                }
              >
                {sub.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default SubscriptionsTable;
