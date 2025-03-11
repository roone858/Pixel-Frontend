import { FaCreditCard, FaImage, FaUsers } from "react-icons/fa";

const StatsCards = ({
  values,
}: {
  values: {
    imageLength: string | number;
    usersLength: string | number;
    subscriptionsLength: string | number;
  };
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">إجمالي المستخدمين</p>
          <p className="text-3xl font-bold">
            {values.usersLength.toLocaleString("ar-EG")}
          </p>
        </div>
        <span className="text-2xl text-orange-500">
          <FaUsers />
        </span>
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">الاشتراكات</p>
          <p className="text-3xl font-bold">
            {values.subscriptionsLength.toLocaleString("ar-EG")}
          </p>
        </div>
        <span className="text-2xl text-orange-500">
          <FaCreditCard />
        </span>
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">إجمالي الصور</p>
          <p className="text-3xl font-bold">
            {values.imageLength.toLocaleString("ar-EG")}
          </p>
        </div>
        <span className="text-2xl text-orange-500">
          <FaImage />{" "}
        </span>
      </div>
    </div>
  </div>
);

export default StatsCards;
