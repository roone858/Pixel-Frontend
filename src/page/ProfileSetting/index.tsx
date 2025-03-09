import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import withAuth from "../../HOC/withAuth";
import Modal from "../../component/Alert";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);
  const [profileImage, setProfileImage] = useState(user.profile.photo);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  useEffect(() => {
    setProfileImage(user.profile.photo);
  }, [user.profile.photo]);
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-semibold mb-6">الإعدادات</h2>

        {/* الحساب الشخصي */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 ">
          <h3 className="text-xl font-semibold  mb-4">معلومات الحساب</h3>
          <div className="space-y-10">
            {/* صورة الحساب */}
            <div className="flex gap-5 items-center space-x-4 mb-4">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600"
              />
              <label className=" bg-orange-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-orange-700">
                تغيير الصورة
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-300">
                الاسم الكامل
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 border-0 border-b border-gray-300 focus:outline-none focus:border-orange-500 "
                placeholder="أدخل اسمك"
                defaultValue={user.profile.name}
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-300">
                اسم المستخدم
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 border-0 border-b border-gray-300 focus:outline-none focus:border-orange-500 "
                placeholder=" اسم المستخدم"
                defaultValue={user.username}
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-300">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full py-2 px-3 border-0 border-b border-gray-300 focus:outline-none focus:border-orange-500 "
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            <button className="bg-orange-500 text-white py-4 px-8 rounded-md">
              حفظ التغييرات
            </button>
          </div>
        </div>

        {/* الأمان والخصوصية */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">الأمان والخصوصية</h3>
          <div className="space-y-4">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg">
              تغيير كلمة المرور
            </button>
          </div>
        </div>

        {/* تفضيلات الإشعارات */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">الإشعارات</h3>
          <div className="flex items-center justify-between">
            <span>تلقي الإشعارات</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 rounded-full peer peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* تخصيص المظهر */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">تخصيص المظهر</h3>
          <div className="flex items-center justify-between">
            <span>الوضع الداكن</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 rounded-full peer peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        {/* حذف الحساب */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-red-600 mb-4">
            حذف الحساب
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            بمجرد حذف الحساب، لن تتمكن من استعادته مرة أخرى. يرجى التأكد قبل
            المتابعة.
          </p>

          <Modal
            toggle="حذف حسابى"
            toggleStyle="block text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            header=" حذف الحساب"
            body=" بمجرد حذف الحساب، لن تتمكن من استعادته مرة أخرى. يرجى التأكد قبل
            المتابعة."
            accept={() => console.log("accept")}
            acceptStyle="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            decline={() => console.log("decline")}
          />
        </div>
      </div>
    </div>
  );
};
const ProtectedSetting = withAuth(Settings);
export default ProtectedSetting;
