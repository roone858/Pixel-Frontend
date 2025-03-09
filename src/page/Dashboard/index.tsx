import { useEffect, useState } from "react";
import { FaUsers, FaCreditCard, FaImage, FaBars } from "react-icons/fa";
import withAdminAuth from "../../HOC/withAdminAuth";
import axios from "../../utils/axios";
import { UserType } from "../../types";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const stats = [
    { title: "إجمالي المستخدمين", value: "٢٬٣٤٥", icon: <FaUsers /> },
    { title: "الاشتراكات", value: "١٬٢٣٤", icon: <FaCreditCard /> },
    { title: "إجمالي الصور", value: "٩٬٨٧٦", icon: <FaImage /> },
  ];
  useEffect(() => {
    // must all api have admin guard
    (async () => {
      const res = await axios.get("http://localhost:3000/users");
      const subRes = await axios.get("http://localhost:3000/subscription");
      setUsers(res.data);
      setSubscriptions(subRes.data);
    })();

    // if (true)     get all user from  api   and save in the state
    //               get all subscription from api
    //               get all resources from api
  }, []);

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* الشريط الجانبي */}
      <div
        className={`bg-white shadow-lg ${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
      >
        <div className="p-4 flex justify-between items-center">
          {sidebarOpen && <h1 className="text-xl font-bold">لوحة التحكم</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars className="text-xl" />
          </button>
        </div>

        <nav className="mt-4">
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center p-4 hover:bg-gray-100 ${
              activeTab === "users" ? "bg-orange-100 text-orange-600" : ""
            }`}
          >
            {sidebarOpen && "المستخدمين"}
            <FaUsers className="ml-2" />
          </button>

          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`w-full flex items-center p-4 hover:bg-gray-100 ${
              activeTab === "subscriptions"
                ? "bg-orange-100 text-orange-600"
                : ""
            }`}
          >
            {sidebarOpen && "الاشتراكات"}
            <FaCreditCard className="ml-2" />
          </button>

          <button
            onClick={() => setActiveTab("photos")}
            className={`w-full flex items-center p-4 hover:bg-gray-100 ${
              activeTab === "photos" ? "bg-orange-100 text-orange-600" : ""
            }`}
          >
            {sidebarOpen && "الصور"}
            <FaImage className="ml-2" />
          </button>
        </nav>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 p-8 overflow-auto">
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <span className="text-2xl text-orange-500">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* أقسام المحتوى */}
        {activeTab === "users" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">قائمة المستخدمين</h2>
            <table className="w-full">
              <thead>
                <tr className="text-right border-b">
                  <th className="pb-2">الاسم</th>
                  <th className="pb-2">البريد الإلكتروني</th>
                  <th className="pb-2">تاريخ الانضمام</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user: UserType) => (
                  <tr className="border-b">
                    <td className="py-3">
                      <div className="flex flex-row-reverse justify-end items-center">
                        <span>{user.profile.name}</span>
                        <img
                          src={user.profile.photo}
                          alt="Profile"
                          className="w-10 h-10 rounded-full border-2 ml-3 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </td>

                    <td>{user.email}</td>
                    <td>2023-01-15</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "subscriptions" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">إدارة الاشتراكات</h2>
            <table className="w-full">
              <thead>
                <tr className="text-right border-b">
                  <th className="pb-2">User ID</th>
                  <th className="pb-2">Plan ID</th>
                  <th className="pb-2">تاريخ الانشاء</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions?.map((sub: any) => (
                  <tr className="border-b">
                    <td className="py-3">{sub.userId}</td>
                    <td>{sub.planId}</td>
                    <td> {new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td> {sub.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "photos" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">إدارة الصور</h2>
          </div>
        )}
      </div>
    </div>
  );
};
const ProtectedDashboard = withAdminAuth(Dashboard);
export default ProtectedDashboard;
