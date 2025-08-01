import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiousSecure";
import useAuth from "../../../hooks/useAuth";
import { FaMoneyBill, FaClipboardList, FaClock } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../../components/loading/Loading";
const EmployeeOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["employee-overview", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employee-overview?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const { totalWorks, totalPayments, pendingPayments } = data;

  const totalPayment = totalPayments.reduce(
    (sum, payment) => sum + payment.salaryAmount,
    0
  );
  const totalpending = pendingPayments.reduce(
    (sum, payment) => sum + payment.salaryAmount,
    0
  );

  const COLORS = ["#0088FE", "#FF8042"];
  const chartdata = [
    { name: "Total Paid(৳)", value: totalPayment },
    { name: "Pending(৳)", value: totalpending||0 },
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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-xl shadow flex items-center gap-4">
          <FaClipboardList className="text-3xl text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold">Total Works</h3>
            <p className="text-xl">{totalWorks || 0}</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow flex items-center gap-4">
          <FaMoneyBill className="text-3xl text-green-600" />
          <div>
            <h3 className="text-lg font-semibold">Total Paid</h3>
            <p className="text-xl">{totalPayments.length || 0}</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow flex items-center gap-4">
          <FaClock className="text-3xl text-yellow-600" />
          <div>
            <h3 className="text-lg font-semibold">Pending Payments</h3>
            <p className="text-xl">{pendingPayments.length || 0}</p>
          </div>
        </div>
      </div>
      {(totalPayment>0 || pendingPayments>0) ?(
        <div>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={chartdata}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
              >
                {chartdata.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ):<div></div>}
    </>
  );
};

export default EmployeeOverview;
