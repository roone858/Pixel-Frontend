import { useEffect, useState } from "react";
import { FaUsers, FaCreditCard, FaImage, FaBars } from "react-icons/fa";
import withAdminAuth from "../../HOC/withAdminAuth";
import axios from "../../utils/axios";
import { ImageType, User, UserType } from "../../types";

const Dashboard = ({ images }: { images: ImageType[] }) => {
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { title: "إجمالي المستخدمين", value: users.length, icon: <FaUsers /> },
    {
      title: "الاشتراكات",
      value: subscriptions.length,
      icon: <FaCreditCard />,
    },
    { title: "إجمالي الصور", value: "٩٬٨٧٦", icon: <FaImage /> },
  ]);

  useEffect(() => {
    // must all api have admin guard
    (async () => {
      const res = await axios.get("http://localhost:3000/users");
      const subRes = await axios.get("http://localhost:3000/subscription");
      setUsers(res.data);
      console.log(res.data);
      console.log(images);
      setStats(() => [
        {
          title: "إجمالي المستخدمين",
          value: res.data.length,
          icon: <FaUsers />,
        },
        {
          title: "الاشتراكات",
          value: subRes.data.length,
          icon: <FaCreditCard />,
        },
        { title: "إجمالي الصور", value: "٩٬٨٧٦", icon: <FaImage /> },
      ]);

      setSubscriptions(subRes.data);
    })();
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
                  <th className="pb-2">المستخدم</th>
                  <th className="pb-2">الاميل</th>
                  <th className="pb-2">الخطة</th>
                  <th className="pb-2">تاريخ الانشاء</th>
                  <th className="pb-2">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions?.map((sub: any) => (
                  <tr className="border-b">
                    <td className="py-3">{sub.user.name || "غير معرف"}</td>
                    <td className="py-3">{sub.user.email || "غير معرف"}</td>
                    <td>{sub.planName}</td>
                    <td> {new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={
                          sub.status == "active"
                            ? "border text-sm font-medium  bg-green-500 border-none rounded-full px-2 py-z "
                            : "border text-sm font-medium  bg-gray-200 border-none rounded-full px-2 py-z "
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
        )}

        {activeTab === "photos" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">إدارة الصور</h2>
            <table className="w-full">
              <thead>
                <tr className="text-right border-b">
                  <th className="pb-2">العنوان</th>
                  <th className="pb-2">الوصف </th>
                  <th className="pb-2">المنشئ</th>
                </tr>
              </thead>
              <tbody>
                {images?.map((image: ImageType) => (
                  <tr className="border-b">
                    <td className="py-3">
                      <div className="flex flex-row-reverse justify-end items-center">
                        <span>{image.title}</span>
                        <img
                          src={
                            "http://localhost:3000/resource/" + image.fileName
                          }
                          alt="Profile"
                          className="w-24  rounded-md border-2 ml-3 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </td>

                    <td>{image.description}</td>
                    <td>
                      {users?.find(
                        (user: UserType) =>
                          String(user._id) === String(image.uploader)
                      )?.profile?.name || "Unknown"}
                    </td>
                    <td className="flex space-x-2 py-2">
                      {/* زر التعديل */}
                      <button
                        // onClick={() => handleEdit(image)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        تعديل
                      </button>

                      {/* زر الحذف */}
                      <button
                        // onClick={() => handleDelete(image._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
const ProtectedDashboard = withAdminAuth(Dashboard);
export default ProtectedDashboard;
