import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiousSecure";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/loading/Loading";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./StripePaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedPayment, setSelectedPayment] = useState(null);
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

  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payroll-requests"],
    queryFn: () =>
      axiosSecure.get(`/payroll?email=${user?.email}`).then((res) => res.data),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="pb-16">
      <div>
        <h2 className="text-2xl font-bold mb-6 ">
          Payroll <span className="text-primary">Management</span>
        </h2>
        <div className="overflow-x-auto">
          {payments.length > 0 ? (
            <table className="table-auto w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Salary</th>
                  <th className="px-4 py-2">Month</th>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Payment Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="text-center border-t border-gray-300 hover:shadow"
                  >
                    <td className="px-4 py-2 truncate">
                      {payment.employeeName}
                    </td>
                    <td className="px-4 py-2 truncate">
                      ৳{payment.salaryAmount}
                    </td>
                    <td className="px-4 py-2 truncate">
                      {monthNames[payment.month] || payment.month}
                    </td>
                    <td className="px-4 py-2 truncate">{payment.year}</td>
                    <td className="px-4 py-2 truncate">
                      {payment.paymentDate
                        ? format(new Date(payment.paymentDate), "PP")
                        : "--"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        disabled={!!payment.paymentDate}
                        className={`px-4 py-1 rounded text-white ${
                          payment.paymentDate
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        }`}
                      >
                        {payment.paymentDate ? "Paid" : "Pay"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p>No Payroll Records Found</p>
            </div>
          )}
        </div>

        {selectedPayment && (
          <div className="fixed top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.8)] backdrop-blur-[3px] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded p-6 w-full max-w-md">
              <button
                className="absolute top-4 right-6 text-xl"
                onClick={() => setSelectedPayment(null)}
              >
                ✖
              </button>
              <Elements stripe={stripePromise}>
                <StripePaymentForm
                  salary={selectedPayment.salaryAmount}
                  paymentId={selectedPayment._id}
                  closeModal={() => {
                    setSelectedPayment(null);
                    refetch();
                  }}
                />
              </Elements>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;
