import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import Loading from "../../../components/loading/Loading";

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

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiousSecure();

  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["payment-history", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  if (isLoading) return <Loading/>;
  if (isError) return <div>Something went wrong</div>;

  const payments = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Payment <span className="text-primary">History</span>
      </h2>
      
      <div className="overflow-x-auto">
        <table className="table border border-gray-300 w-full text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="text-center px-4 py-2">Month</th>
              <th className="text-center px-4 py-2">Year</th>
              <th className="text-center px-4 py-2">Amount</th>
              <th className="text-center px-4 py-2">Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No payment records found.
                </td>
              </tr>
            )}
            {payments.map((pay) => (
              <tr
                key={pay._id}
                className="border-b border-b-gray-300 text-center hover:shadow"
              >
                <td className="px-4 py-2 ">
                  {monthNames[pay.month] || pay.month}
                </td>
                <td className=" px-4 py-2">{pay.year}</td>
                <td className="px-4 py-2">৳{pay.salaryAmount}</td>
                <td className=" px-4 py-2">{pay.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-18 flex justify-end space-x-2">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border btn btn-primary hover:btn-outline hover:bg-transparent hover:text-primary rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-3 py-1 flex items-center justify-center border border-primary rounded text-primary">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((old) => (old < totalPages ? old + 1 : old))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded btn btn-primary hover:btn-outline hover:bg-transparent hover:text-primary disabled:opacity-90"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
