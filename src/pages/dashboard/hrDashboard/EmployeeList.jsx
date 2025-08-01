import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import Loading from "../../../components/loading/Loading";
import useAuth from "../../../hooks/useAuth";
import PayModal from "./PayModal";
import { Link } from "react-router";

const EmployeeList = () => {
  const axiosSecure = useAxiousSecure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const {
    data: employees = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-employees", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=employee");
      return res.data;
    },
  });

  const toggleVerify = async (user) => {
    const updated = { isVerified: !user?.isVerified };
    const res = await axiosSecure.patch(`/users/${user._id}`, updated);
    if (res.data.modifiedCount > 0) {
      toast.success("Verification status updated");
      refetch();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Employee <span className="text-primary">List</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table border border-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Bank</th>
              <th>Salary</th>
              <th>Pay</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp._id}
                className="hover:border-primary duration-300 ease-in-out transition-all hover:shadow"
              >
                <td className="truncate">{emp.name}</td>
                <td className="truncate">{emp.email}</td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      emp.isVerified ? "btn-success" : "btn-error"
                    }`}
                    onClick={() => toggleVerify(emp)}
                  >
                    {emp.isVerified ? <FaCheck /> : <FaTimes />}
                  </button>
                </td>
                <td className="truncate">{emp.bank_account_no || "N/A"}</td>
                <td className="truncate">${emp.salary || 0}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    disabled={!emp.isVerified}
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setIsModalOpen(true);
                    }}
                  >
                    Pay
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/details/${emp._id}`}>
                    <button className="btn btn-sm btn-outline">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedEmployee && (
        <PayModal
          employee={selectedEmployee}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
