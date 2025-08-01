import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../components/loading/Loading";

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(null);
  const onSubmit = async (data) => {
    setLoading(true);
    axios
      .post("https://jobtica-server.vercel.app/add-message", data)
      .then((res) => {
        if (res.data.insertedId) {
          reset();
          setLoading(false);
          toast.success("Sent Successfull");
        } else {
          setLoading(false);
          toast.error("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something Went Wrong");
      });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-2xl mx-auto p-6 pb-14">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Contact <span className="text-primary">Us</span>
      </h2>
      <p className="text-center mb-8">
        Dhaka, Bangladesh <br />
        Email: junayedhossain603@gmail.com | Phone: +880 1914 606 160
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-2xl shadow"
      >
        <div>
          <label className="block mb-1 font-medium">Your Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="example@email.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:border-primary"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Your Message</label>
          <textarea
            {...register("message", { required: true })}
            rows={5}
            placeholder="Write your opinion or feedback here..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:border-primary resize-none"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary px-6 py-2 rounded-lg hover:btn-outline hover:bg-transparent hover:text-primary transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
