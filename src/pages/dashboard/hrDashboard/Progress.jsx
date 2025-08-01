import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import Loading from "../../../components/loading/Loading";

const Progress = () => {
  const axiosSecure = useAxiousSecure();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");


  const { data: records = [], isLoading } = useQuery({
    queryKey: ["all-work-records"],
    queryFn: async () => {
      const res = await axiosSecure.get("/work-records");
      return res.data;
    },
  });

 
  const employeeNames = [...new Set(records.map((r) => r.employeeName))];


  const filteredRecords = records.filter((record) => {
    const matchEmployee = selectedEmployee
      ? record.employeeName === selectedEmployee
      : true;
    const matchMonth = selectedMonth
      ? new Date(record.date).getMonth() + 1 === parseInt(selectedMonth)
      : true;
    return matchEmployee && matchMonth;
  });
  if (isLoading) {
  return <Loading/>
}
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        All <span className="text-primary">Employee</span> Work Records
      </h2>

      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="select focus:outline-none"
        >
          <option value="">All Employees</option>
          {employeeNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="select focus:outline-none"
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table border border-gray-200">
            <thead className="bg-primary text-white">
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Hours</th>
                <th>Task</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((rec, index) => (
                <tr
                  key={index}
                  className="hover:border-primary duration-300 transition-all ease-in hover:shadow"
                >
                  <td className="truncate">{rec.employeeName}</td>
                  <td className="truncate">
                    {new Date(rec.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="truncate">{rec.hoursWorked}</td>
                  <td className="truncate">{rec.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No Records Found</div>
      )}
    </div>
  );
};

export default Progress;
