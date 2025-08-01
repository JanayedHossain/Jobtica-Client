import {
  FaTasks,
  FaUserShield,
  FaUserCog,
  FaLock,
  FaChartBar,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "Employee Workflow Tracker",
      description:
        "Employees can submit daily tasks with hours and dates. HR can monitor work updates easily.",
      icon: <FaTasks className="text-4xl text-primary mb-4" />,
    },
    {
      title: "Verified Salary Management",
      description:
        "HR verifies employees and initiates salary payments. Admin approves securely via payroll system.",
      icon: <FaMoneyCheckAlt className="text-4xl text-primary mb-4" />,
    },
    {
      title: "Role-Based Dashboards",
      description:
        "Employee, HR, and Admin dashboards with role-specific features and actions.",
      icon: <FaUserCog className="text-4xl text-primary mb-4" />,
    },
    {
      title: "Secure Authentication",
      description:
        "Login/register with email/password or Google. JWT-protected routes for all operations.",
      icon: <FaLock className="text-4xl text-primary mb-4" />,
    },
    {
      title: "Performance Monitoring",
      description:
        "HR can filter employee tasks by month and name. Shows dynamic total work hour summary.",
      icon: <FaChartBar className="text-4xl text-primary mb-4" />,
    },
    {
      title: "Payment History & Analytics",
      description:
        "Employees can view salary history. HR/Admin get month-wise analytics and charts.",
      icon: <FaUserShield className="text-4xl text-primary mb-4" />,
    },
  ];

  return (
    <section className="py-16">
      <div className="w-[95%] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 font-primaryFont">
          Our <span className="text-primary">Services</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-lg transition duration-300 border border-gray-300 hover:border-primary"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 mt-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
