import Marquee from "react-fast-marquee";
import {
  FaUserCheck,
  FaMoneyCheckAlt,
  FaChartLine,
  FaBriefcase,
} from "react-icons/fa";

const milestones = [
  {
    icon: <FaUserCheck className="text-green-600 text-lg mr-2" />,
    text: "100+ Verified Employees",
  },
  {
    icon: <FaMoneyCheckAlt className="text-blue-600 text-lg mr-2" />,
    text: "500+ Salary Payments Processed",
  },
  {
    icon: <FaChartLine className="text-orange-500 text-lg mr-2" />,
    text: "98% HR Satisfaction Rate",
  },
  {
    icon: <FaBriefcase className="text-purple-500 text-lg mr-2" />,
    text: "2000+ Hours Logged by Employees",
  },
];

const CompanyMilestones = () => {
  return (
    <div className="bg-base-200 py-2 border-y border-primary text-2xl mb-16">
      <Marquee pauseOnHover={true} gradient={false} speed={60}>
        {milestones.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 font-semibold text-secondary mx-10"
          >
            {item.icon}
            {item.text}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CompanyMilestones;
