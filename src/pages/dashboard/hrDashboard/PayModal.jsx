import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import useAuth from "../../../hooks/useAuth";

const PayModal = ({ employee, onClose }) => {
  const axiosSecure = useAxiousSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();


  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const onSubmit = async (data) => {
    setLoading(true);
    if (!data.month || !data.year) {
      setLoading(false);
      toast.error("Please select both month and year");
      return;
    }
    const paymentRequestInfo = {
      employeeEmail: employee.email,
      employeeName: employee.name,
      salaryAmount: employee.salary,
      month: data.month,
      year: data.year,
      status: "pending",
      paymentDate: null,
      requestedByHREmail: user.email,
      requestCreatedAt: new Date(),
    };
    axiosSecure
      .post(`/payment-request?email=${user.email}`, paymentRequestInfo)
      .then((result) => {
        setLoading(false);
        if (result.data.insertedId) {
          reset();
          onClose();
          toast.success("Payment request sent!");
        } else if (!result.data.success) {
          toast.error(result.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("something went wrong");
      });
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(255,255,255,0.9)] backdrop-blur-[3px] flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] rounded-xl border border-primary p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-5">
          Payment <span className="text-primary">Request</span>
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block mb-1">Name:</label>
            <input
              {...register("name")}
              defaultValue={employee?.name}
              readOnly
              className="outline-none rounded p-2 bg-gray-100 w-full"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input
              {...register("email")}
              defaultValue={employee?.email}
              readOnly
              className="outline-none rounded p-2 bg-gray-100 w-full"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <input
              {...register("role")}
              defaultValue={employee?.role}
              readOnly
              className="outline-none rounded p-2 bg-gray-100 w-full"
              placeholder="Role"
            />
          </div>
          <div>
            <label className="block mb-1">Salary</label>
            <input
              {...register("salary")}
              defaultValue={employee?.salary}
              readOnly
              className="outline-none rounded p-2 bg-gray-100 w-full"
              placeholder="Salary"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1">Select Month:</label>
            <select
              {...register("month")}
              className="w-full border border-gray-200 cursor-pointer focus:outline-none rounded p-2"
            >
              <option value="">-- Month --</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1">Select Year:</label>
            <select
              {...register("year")}
              className="w-full border border-gray-200 cursor-pointer focus:outline-none rounded p-2"
            >
              <option value="">-- Year --</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end space-x-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 cursor-pointer"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded cursor-pointer bg-blue-600 text-white disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayModal;
