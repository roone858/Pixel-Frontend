import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import withAuth from "../../HOC/withAuth";
import Modal from "../../component/Alert";
import usersService from "../../services/users.service";
import Breadcrumb from "../../component/Breadcrumb";
import LoadingSpinner from "../../component/LoadingSpinner";

const InputField: React.FC<{
  label: string;
  name: string;
  type: string;
  placeholder: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, type, placeholder, defaultValue, onChange }) => (
  <div>
    <label className="block text-gray-600 dark:text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      className="w-full py-2 px-3 border-0 border-b border-gray-300 focus:outline-none focus:border-orange-500"
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  </div>
);

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [profileImage, setProfileImage] = useState(user.profile.photo);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        setProfileImageFile(file);
      }
    },
    []
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const { name, photo, ...updatedUserWithoutName } = updatedUser;
      const result = await usersService.update(
        {
          ...updatedUserWithoutName,
          profile: {
            name: name || user.profile.name,
            photo: profileImageFile?.name || user.profile.photo,
          },
        },
        profileImageFile
      );
      updateUser(result);
      setIsSuccess(true);
      setErrMessage("");
    } catch (err) {
      setErrMessage("حصلت مشكلة لم يتم التحديث");
    } finally {
      setIsLoading(false);
    }
  }, [updatedUser, profileImageFile, user, updateUser]);

  useEffect(() => {
    setUpdatedUser(user);
    setProfileImage(user.profile.photo);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto py-10 px-6">
        <Breadcrumb />

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">معلومات الحساب</h3>
          <div className="space-y-10">
            <div className="flex gap-5 items-center space-x-4 mb-4">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600"
              />
              <label className="bg-orange-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-orange-700">
                تغيير الصورة
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <InputField
              label="الاسم الكامل"
              name="name"
              type="text"
              placeholder="أدخل اسمك"
              defaultValue={user.profile.name}
              onChange={handleInputChange}
            />

            <InputField
              label="اسم المستخدم"
              name="username"
              type="text"
              placeholder="اسم المستخدم"
              defaultValue={user.username}
              onChange={handleInputChange}
            />

            <InputField
              label="البريد الإلكتروني"
              name="email"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              defaultValue={user.email}
              onChange={handleInputChange}
            />

            {isLoading && <LoadingSpinner />}
            {isSuccess && (
              <span className="bg-green-300 text-center rounded-lg py-2 px-1 text-sm block mb-4">
                تم تغيير البيانات بنجاح
              </span>
            )}
            {errMessage && (
              <span className="bg-red-300 text-center rounded-lg py-2 px-1 text-sm block mb-4">
                {errMessage}
              </span>
            )}

            <Modal
              toggle="حفظ التغييرات"
              toggleStyle="bg-orange-500 text-white py-4 px-8 rounded-md"
              header="تغيير بيانات الحساب"
              body="سيتم تغيير بيانات. يرجى التأكد قبل المتابعة."
              accept={handleSubmit}
              acceptStyle="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              decline={() => console.log("decline")}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">الأمان والخصوصية</h3>
          <div className="space-y-4">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg">
              تغيير كلمة المرور
            </button>
          </div>
        </div>

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
            toggleStyle="block text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            header="حذف الحساب"
            body="بمجرد حذف الحساب، لن تتمكن من استعادته مرة أخرى. يرجى التأكد قبل المتابعة."
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
