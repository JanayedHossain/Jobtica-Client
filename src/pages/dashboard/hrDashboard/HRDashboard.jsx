import { useQuery } from "@tanstack/react-query";
import { FaUserCheck, FaMoneyCheckAlt, FaClipboardList } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/loading/Loading";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const HrOverview = () => {
  const axiosSecure = useAxiousSecure();
  const { user, loading } = useAuth();
  const { data: employees = [], isLoading: employeeLoading } = useQuery({
    queryKey: ["employees", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=employee");
      return res.data;
    },
  });

  const { data: payment = [], isLoading: paymentLoading } = useQuery({
    queryKey: ["payment-requests", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-details?email=${user.email}`);
      return res.data;
    },
  });
  const { data: totalPaid = [], isLoading: totalpaidLoading } = useQuery({
    queryKey: ["total-paid", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payroll?email=${user?.email}`);
      return res.data;
    },
  });

  const verifiedcount = employees.filter((item) => item.isVerified === true);

  const totalPaymentRequest = payment.filter(
    (item) => item.paymentDate === null
  );

  const totalPaidbyAdmin = totalPaid.reduce((sum, item) => {
    return item.paymentDate ? sum + (item.salaryAmount || 0) : sum;
  }, 0);




  const COLORS = ["#0088FE", "#FF8042"];
  const data = [
    { name: "Verified", value: verifiedcount.length },
    { name: "Unverified", value: employees.length - verifiedcount.length },
  ];

  if (employeeLoading || paymentLoading||totalpaidLoading) {
    return <Loading />;
  }

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
    <div className="pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 border">
          <MdPeopleAlt className="text-4xl text-indigo-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Employees</p>
            <p className="text-xl font-bold text-gray-800">
              {employees.length}
            </p>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 border">
          <FaUserCheck className="text-4xl text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Verified Employees</p>
            <p className="text-xl font-bold text-gray-800">
              {verifiedcount.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 border">
          <FaClipboardList className="text-4xl text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Pending Pay Requests</p>
            <p className="text-xl font-bold text-gray-800">
              {totalPaymentRequest.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 border">
          <FaMoneyCheckAlt className="text-4xl text-rose-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Paid (৳)</p>
            <p className="text-xl font-bold text-gray-800">
              {totalPaidbyAdmin}
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-3xl text-center py-4 font-primaryFont font-bold">
        Verifeid vs <span className="text-primary">Unverified</span>
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
  );
};

export default HrOverview;
