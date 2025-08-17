import { useState } from "react";

// All features for Employee Management System
const products = [
  // Employee Features
  {
    id: 1,
    title: "Work Sheet",
    description:
      "Post your daily tasks with hours and date. Edit or delete entries.",
    category: "Employee",
  },
  {
    id: 2,
    title: "Payment History",
    description: "View your monthly salary records and transaction details.",
    category: "Employee",
  },
  // HR Features
  {
    id: 3,
    title: "Employee List",
    description:
      "View all employees, verify status, and check bank details & salary.",
    category: "HR",
  },
  {
    id: 4,
    title: "Task Assignment",
    description: "Assign tasks to employees and monitor their completion.",
    category: "HR",
  },
  {
    id: 5,
    title: "Pay Employee",
    description:
      "Process salary payments for verified employees using modal form.",
    category: "HR",
  },
  {
    id: 6,
    title: "Employee Details",
    description:
      "View single employee profile with designation and salary chart.",
    category: "HR",
  },
  {
    id: 7,
    title: "Progress Report",
    description:
      "Filter submitted work by employee and month to monitor productivity.",
    category: "HR",
  },
  // Admin Features
  {
    id: 8,
    title: "All Employee List",
    description:
      "View all verified employees and HRs. Fire or promote employees.",
    category: "Admin",
  },
  {
    id: 9,
    title: "Make HR",
    description: "Promote employees to HR role and manage access rights.",
    category: "Admin",
  },
  {
    id: 10,
    title: "Adjust Salary",
    description:
      "Increase salary of employees and HRs. Decreasing is not allowed.",
    category: "Admin",
  },
  {
    id: 11,
    title: "Payroll Approval",
    description:
      "Approve HR payment requests and populate salary date in real-time.",
    category: "Admin",
  },
];

const AllFeatures = () => {
  const [filter, setFilter] = useState("All");

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className=" min-h-screen pb-16 pt-24 max-w-[95%] mx-auto">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-10 font-primaryFont">
        All <span className="text-primary">Features</span>
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {["All", "Employee", "HR", "Admin"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === cat
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-primary cursor-pointer hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className=" p-6 rounded-xl shadow hover:shadow-lg transition border border-secondary"
          >
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <span className="text-sm text-primary font-medium">
              {product.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFeatures;
