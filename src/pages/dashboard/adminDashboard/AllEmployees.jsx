import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import Loading from "../../../components/loading/Loading";
import { FaUserShield, FaUserSlash, FaCheck, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const AllEmployees = () => {
  const axiosSecure = useAxiousSecure();
  const [viewMode, setViewMode] = useState("table");


  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-employees");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;


  const handleFire = async (userId, name) => {
    const result = await Swal.fire({
      title: `Fire ${name}?`,
      text: "Once fired, the user cannot login anymore.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Fire",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/update-user/${userId}`, { fired: true });
        await Swal.fire("Fired!", `${name} has been fired.`, "success");
        refetch();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  
  const handleMakeHR = async (userId) => {
    try {
      await axiosSecure.patch(`/update-user/${userId}`, { role: "hr" });
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Error updating role", "error");
    }
  };

 
  const handleSalaryUpdate = async (user) => {
    const { value: amount } = await Swal.fire({
      title: `Update Salary for ${user.name}`,
      input: "number",
      inputLabel: `Current Salary: ৳${user.salary}`,
      inputPlaceholder: "Enter new salary (must be higher)",
      inputAttributes: {
        min: user.salary + 1,
        step: 1,
      },
      showCancelButton: true,
    });

    if (amount) {
      if (Number(amount) <= user.salary) {
        return Swal.fire("Error", "Salary must be increased", "error");
      }
      try {
        await axiosSecure.patch(`/update-user/${user._id}`, {
          salary: Number(amount),
        });
        await Swal.fire("Success", "Salary updated!", "success");
        refetch();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-5 font-bold">
        All Verified <span className="text-primary">Employees & HRs</span>
      </h2>
      <div className="flex justify-end pb-6">
        <button
          onClick={() =>
            setViewMode((prev) => (prev === "table" ? "grid" : "table"))
          }
          className="btn btn-sm btn-outline btn-primary"
        >
          {viewMode === "table"
            ? "Switch to Grid View"
            : "Switch to Table View"}
        </button>
      </div>
      {employees.length > 0 ? (
        <div>
          {viewMode === "table" && (
            <div className="overflow-x-auto">
              <table className="table w-full border border-gray-300">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Salary (৳)</th>
                    <th>Make HR</th>
                    <th>Fire</th>
                    <th>Update Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr
                      key={emp._id}
                      className={emp.fired ? "opacity-50" : " hover:shadow"}
                    >
                      <td className="truncate">{emp.name}</td>
                      <td className="truncate">{emp.designation}</td>
                      <td className="truncate">{emp.salary}</td>
                      <td>
                        {emp.role !== "hr" && !emp.fired ? (
                          <button
                            onClick={() => handleMakeHR(emp._id)}
                            className="btn btn-xs btn-success hover:btn-outline truncate hover:bg-transparent hover:text-black"
                          >
                            Make HR <FaUserShield className="inline ml-1" />
                          </button>
                        ) : (
                          <span>
                            {emp.role === "hr" ? (
                              <FaCheck className="text-green-500" />
                            ) : (
                              "—"
                            )}
                          </span>
                        )}
                      </td>
                      <td>
                        {!emp.fired ? (
                          <button
                            onClick={() => handleFire(emp._id, emp.name)}
                            className="btn btn-xs btn-error hover:btn-outline truncate hover:bg-transparent hover:text-black"
                          >
                            Fire <FaUserSlash className="inline ml-1" />
                          </button>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            Fired
                          </span>
                        )}
                      </td>
                      <td>
                        {!emp.fired && (
                          <button
                            onClick={() => handleSalaryUpdate(emp)}
                            className="btn btn-xs btn-warning hover:btn-outline truncate hover:bg-transparent hover:text-black"
                          >
                            Edit <FaEdit className="inline ml-1" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {employees.map((emp) => (
                <div
                  key={emp._id}
                  className={`border border-primary rounded p-4 relative ${
                    emp.fired ? "opacity-50" : ""
                  }`}
                >
                  <h3 className="font-bold text-lg">{emp.name}</h3>
                  <p>Designation: {emp.designation}</p>
                  <p>Role: {emp.role}</p>
                  <p>Salary: ৳{emp.salary}</p>

                  {emp.role !== "hr" && !emp.fired && (
                    <button
                      onClick={() => handleMakeHR(emp._id)}
                      className="btn btn-xs btn-success mt-2 hover:btn-outline truncate hover:bg-transparent hover:text-black mr-5"
                    >
                      Make HR <FaUserShield className="inline ml-1" />
                    </button>
                  )}

                  {!emp.fired ? (
                    <button
                      onClick={() => handleFire(emp._id, emp.name)}
                      className="btn btn-xs btn-error mt-2 hover:btn-outline truncate hover:bg-transparent hover:text-black"
                    >
                      Fire <FaUserSlash className="inline ml-1" />
                    </button>
                  ) : (
                    <p className="text-red-500 font-semibold mt-2">Fired</p>
                  )}

                  {!emp.fired && (
                    <button
                      onClick={() => handleSalaryUpdate(emp)}
                      className="btn btn-xs btn-warning mt-2 hover:btn-outline truncate hover:bg-transparent hover:text-black ml-5"
                    >
                      Edit Salary <FaEdit className="inline ml-1" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>No Verified Employees or HRs Found</p>
        </div>
      )}
    </div>
  );
};

export default AllEmployees;
