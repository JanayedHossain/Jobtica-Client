import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";


const ProfilePage = () => {
  const { user } = useAuth()
    const { role, details } = useUserRole()
    const { bank_account_no, salary, designation } = details;
    
  return (
    <div className="min-h-screen py-12 px-6">
      <h2 className="text-2xl font-bold mb-4">
        My <span className="text-primary">Profile</span>
      </h2>
      <div className="max-w-3xl mx-auto mt-6 p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt={user?.displayName || "User"}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">
            {user?.displayName || "N/A"}
          </h3>
          <p className="text-gray-500">{user?.email || "N/A"}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-secondary">Role:</span>
            <span className="capitalize">{role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-secondary">Bank Account:</span>
            <span>{bank_account_no || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-secondary">Salary:</span>
            <span>{salary ? `৳${salary}` : "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-secondary">Designation:</span>
            <span>{designation || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
