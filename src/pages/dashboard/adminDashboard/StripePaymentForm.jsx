import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiousSecure";
import useAuth from "../../../hooks/useAuth";

const StripePaymentForm = ({ salary, paymentId, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { salary })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => {
        toast.error("Failed to initiate payment");
        console.error(err);
      });
  }, [axiosSecure, salary]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.displayName || "Anonymous",
              email: user?.email || "N/A",
            },
          },
        }
      );

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        await axiosSecure.patch(`/payroll/pay/${paymentId}`, {
          transactionId: paymentIntent.id,
        });
        toast.success("Payment successful!");
        closeModal();
      }
    } catch (err) {
      toast.error("Payment failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-4 rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`btn w-full text-primary border-primary ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : `Pay $${salary}`}
      </button>
    </form>
  );
};

export default StripePaymentForm;
