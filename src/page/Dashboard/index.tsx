import { useContext, useEffect, useState } from "react";
import { SubscriptionType, UserType } from "../../types";
import axios from "../../utils/axios";
import PaymentPlansTable from "../../component/dashboardComponent/PaymentPlansTable";
import UsersTable from "../../component/dashboardComponent/UserTable";
import StatsCards from "../../component/dashboardComponent/StatsCards";
import SubscriptionsTable from "../../component/dashboardComponent/SubscriptionTable";
import PhotosTable from "../../component/dashboardComponent/PhotosTable";
import Sidebar from "../../component/dashboardComponent/Sidebar";
import { StoreContext } from "../../context/StoreContext";
import withAdminAuth from "../../HOC/withAdminAuth";

const Dashboard = () => {
  const { images, plans } = useContext(StoreContext);

  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [values, setValues] = useState<{
    imageLength: string | number;
    usersLength: string | number;
    subscriptionsLength: string;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, subRes] = await Promise.all([
          axios.get("http://localhost:3000/users"),
          axios.get("http://localhost:3000/subscription/all"),
        ]);

        setUsers(usersRes.data);
        setSubscriptions(
          subRes.data.sort(
            (a: SubscriptionType, b: SubscriptionType) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        setValues({
          imageLength: images.length,
          usersLength: usersRes?.data.length,
          subscriptionsLength: subRes?.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [images.length]);

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 p-8 overflow-auto">
        {values?.usersLength && <StatsCards values={values} />}
        {activeTab === "users" && <UsersTable users={users} />}
        {activeTab === "subscriptions" && (
          <SubscriptionsTable subscriptions={subscriptions} />
        )}
        {activeTab === "photos" && (
          <PhotosTable images={images} users={users} />
        )}
        {activeTab === "payment-plans" && <PaymentPlansTable plans={plans} />}
      </div>
    </div>
  );
};
const ProtectedDashboard = withAdminAuth(Dashboard);
export default ProtectedDashboard;
