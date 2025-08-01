import Loading from "../../../components/loading/Loading";
import useUserRole from "../../../hooks/useUserRole";
import AdminDashboard from "../adminDashboard/AdminDashboard";
import EmployeeDashboard from "../employeeDashboard/EmployeeDashboard";
import HRDashboard from "../hrDashboard/HRDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role === "hr") {
    return <HRDashboard />;
  } else if (role === "employee") {
    return <EmployeeDashboard />;
  } else if (role === "admin") {
    return <AdminDashboard />;
  } else {
    return <p>User role not found</p>;
  }
};

export default DashboardHome;
