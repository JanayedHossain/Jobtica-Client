import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiousSecure from "../../hooks/useAxiousSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Cell,
  Label,
} from "recharts";
import Loading from "../../components/loading/Loading";

const EmployeeDetails = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
    const axiosSecure = useAxiousSecure();
    const colors = [
      "#6366F1",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#06B6D4",
    ];
  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { data: employee = {}, isLoading } = useQuery({
    queryKey: ["employee-details", id],
    enabled: !loading && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/details/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading/>;
  }

  const chartData = employee?.paymentHistory?.map((item) => ({
    name: `${monthNames[parseInt(item.month)]} ${item.year}`,
    salary: item.salaryAmount,
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center gap-6 border border-gray-200 p-6 rounded-lg shadow">
        <img
          src={employee?.photo}
          alt="Employee"
          className="h-24 w-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee?.name}</h2>
          <p className="text-gray-600">{employee?.designation}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">
        Salary History
      </h3>
      <div className="overflow-x-auto">

      {chartData?.length > 0 ? (
        <ResponsiveContainer width={800} height={400}>
          <BarChart
            width={800}
            height={400}
            data={chartData}
            margin={{ top: 20, right: 30, left: 40, bottom: 40 }} 
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name">
              <Label value="Month" offset={-20} position="insideBottom" />
            </XAxis>

            <YAxis>
              <Label
                value="Salary"
                angle={-90}
                  position="insideLeft"
                  offset={-20}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>

            <Tooltip />

            <Bar dataKey="salary">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
              <LabelList dataKey="salary" position="top" offset={20} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No payment history available.</p>
      )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
