import {
  FaBars,
  FaCreditCard,
  FaImage,
  FaMoneyBill,
  FaUsers,
} from "react-icons/fa";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => (
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
        className={`w-full flex flex-row-reverse justify-end items-center p-4 hover:bg-gray-100 ${
          activeTab === "users" ? "bg-orange-100 text-orange-600" : ""
        }`}
      >
        {sidebarOpen && "المستخدمين"}
        <FaUsers className="ml-2" />
      </button>

      <button
        onClick={() => setActiveTab("subscriptions")}
        className={`w-full flex flex-row-reverse justify-end items-center p-4 hover:bg-gray-100 ${
          activeTab === "subscriptions" ? "bg-orange-100 text-orange-600" : ""
        }`}
      >
        {sidebarOpen && "الاشتراكات"}
        <FaCreditCard className="ml-2" />
      </button>

      <button
        onClick={() => setActiveTab("photos")}
        className={`w-full flex flex-row-reverse justify-end items-center p-4 hover:bg-gray-100 ${
          activeTab === "photos" ? "bg-orange-100 text-orange-600" : ""
        }`}
      >
        {sidebarOpen && "الصور"}
        <FaImage className="ml-2" />
      </button>

      <button
        onClick={() => setActiveTab("payment-plans")}
        className={`w-full flex flex-row-reverse justify-end items-center p-4 hover:bg-gray-100 ${
          activeTab === "payment-plans" ? "bg-orange-100 text-orange-600" : ""
        }`}
      >
        {sidebarOpen && "خطط الدفع"}
        <FaMoneyBill className="ml-2" />
      </button>
    </nav>
  </div>
);
export default Sidebar;
