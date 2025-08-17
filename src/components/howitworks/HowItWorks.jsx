// HowItWorks.jsx
import React from "react";
import { FaUser, FaClipboardList, FaUsersCog, FaKey } from "react-icons/fa";

const steps = [
  {
    title: "Register / Login",
    description:
      "Sign up using Email/Password or Google login. Choose your role: Employee or HR. Admin account is pre-created.",
    icon: <FaUser className="text-5xl text-blue-500 mb-4" />,
  },
  {
    title: "Employee Workflow",
    description:
      "Employees can submit their daily work tasks, log hours, and track their payment history in real-time.",
    icon: <FaClipboardList className="text-5xl text-green-500 mb-4" />,
  },
  {
    title: "HR Management",
    description:
      "HR can verify employees, approve payments, and monitor submitted tasks with a clear dashboard.",
    icon: <FaUsersCog className="text-5xl text-yellow-500 mb-4" />,
  },
  {
    title: "Admin Control",
    description:
      "Admin can manage all users, assign HR roles, adjust salaries, and approve payroll requests securely.",
    icon: <FaKey className="text-5xl text-red-500 mb-4" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="max-w-[95%] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 font-primaryFont">
          How It <span className="text-primary">Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300 flex flex-col items-center"
            >
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
