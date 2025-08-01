import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import Loading from "../../../components/loading/Loading";
import {
  FaUsers,
  FaUserTie,
  FaUserSlash,
  FaMoneyBillWave,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminOverview = () => {
  const axiosSecure = useAxiousSecure();
  const { user } = useAuth();
  const { data: users = [], isLoading: userLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-employees"); // backend route needed
      return res.data;
    },
  });

  const { data: payments = [], isLoading: paymentLoading } = useQuery({
    queryKey: ["payroll-requests"],
    queryFn: () =>
      axiosSecure.get(`/payroll?email=${user?.email}`).then((res) => res.data),
  });

  if (paymentLoading || userLoading) return <Loading />;

  const totalEmployees = users.filter(
    (item) => item.role === "employee" && item.isVerified && !item.fired
  ).length;
  const totalHRs = users.filter(
    (item) => item.role === "hr" && !item.fired
  ).length;
  const totalFired = users.filter((item) => item.fired).length;

  const totalPaid = payments.reduce((sum, item) => {
    return item.paymentDate ? sum + (item.salaryAmount || 0) : sum;
  }, 0);

  const COLORS = ["#0088FE", "#FF8042"];
  const data = [
    { name: "Employee", value: totalEmployees },
    { name: "Hr", value: totalHRs },
    { name: "Fired", value: totalFired },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    value,
  }) => {
    const RADIAN = Math.PI / 180;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${name}: ${value}`}
      </text>
    );
  };
  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        <div className="bg-white border rounded-xl shadow p-5 flex items-center gap-4">
          <FaUsers className="text-4xl text-indigo-600" />
          <div>
            <p className="text-gray-500 text-sm">Employees</p>
            <p className="text-xl font-bold text-gray-800">{totalEmployees}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow p-5 flex items-center gap-4">
          <FaUserTie className="text-4xl text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">HR Executives</p>
            <p className="text-xl font-bold text-gray-800">{totalHRs}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow p-5 flex items-center gap-4">
          <FaUserSlash className="text-4xl text-red-500" />
          <div>
            <p className="text-gray-500 text-sm">Fired Users</p>
            <p className="text-xl font-bold text-gray-800">{totalFired}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow p-5 flex items-center gap-4">
          <FaMoneyBillWave className="text-4xl text-rose-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Paid (৳)</p>
            <p className="text-xl font-bold text-gray-800">{totalPaid}</p>
          </div>
        </div>
      </div>
      {(totalEmployees > 0 || totalFired > 0 || totalHRs > 0) && (
        <div>
          <h1 className="text-center text-3xl py-5">
            Employee <span className="text-primary">vs</span> HR{" "}
            <span className="text-primary">vs </span>Fired
          </h1>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
