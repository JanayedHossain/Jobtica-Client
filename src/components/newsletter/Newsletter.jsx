import { useState } from "react";
import { toast } from "react-toastify";
const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }

    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div
      className="bg-primary max-w-[95%] mx-auto text-white py-12 px-4 my-16 rounded-2xl"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-sm md:text-base mb-6">
          Subscribe to receive the latest job listings, career tips, and updates
          from JobTicar straight to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className=" w-full md:min-w-lg sm:w-auto bg-transparent border-transparent border-b border-b-white p-2 placeholder:text-gray-50 outline-none text-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-sm md:btn-md btn-neutral text-white hover:bg-transparent hover:text-white transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
