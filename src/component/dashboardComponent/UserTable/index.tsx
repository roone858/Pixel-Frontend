import { UserType } from "../../../types";

const UsersTable = ({ users }: { users: UserType[] }) => (
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
          <tr key={user._id} className="border-b">
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
);

export default UsersTable;
