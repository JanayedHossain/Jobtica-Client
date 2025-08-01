import { useState } from "react";

const faqs = [
  {
    question: "How can I register as an employee or HR?",
    answer:
      "You can register via the registration page by selecting your role as either Employee or HR in the dropdown menu.",
  },
  {
    question: "Can I reset my password?",
    answer:
      "Currently, password reset and email verification features are not implemented to keep the process simple.",
  },
  {
    question: "Who can approve employee payments?",
    answer:
      "Only HR users can approve and initiate salary payments to verified employees.",
  },
  {
    question: "How is employee workload tracked?",
    answer:
      "Employees submit their work updates through the worksheet page, and HR can monitor these submissions.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-[95%] mx-auto mb-16">
      <h2 className="text-3xl font-bold mb-14 text-center font-primaryFont">
        Frequently Asked <span className="text-primary">Questions</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="order-1 lg:order-2 flex items-center">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="FAQ Illustration"
            className="rounded-lg shadow-lg sm:w-[70%] md:w-[50%] lg:w-[70%] xl:w-[60%]  mx-auto"
          />
        </div>

        <div className="order-2 lg:order-1">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg mb-4">
              <button
                onClick={() => toggleFAQ(idx)}
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
