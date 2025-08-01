import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import SocialLogin from "../../../components/social-login/SocialLogin";
import { AuthContext } from "../../../contexts/authContext/AuthContext";
import Loading from "../../../components/loading/Loading";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const { loginUser, loading, setLoading, logOutUser } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();


  const { mutateAsync: checkUserStatus, isPending } = useMutation({
    mutationFn: async ({ email, token }) => {
      const res = await axios.get(
        `https://jobtica-server.vercel.app/user-role?email=${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });


  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await loginUser(data.email, data.password);
      const token = await result.user.getIdToken();

      const userData = await checkUserStatus({ email: data.email, token });

      if (userData.fired) {
        await logOutUser();
        toast.error("You are fired. Login not allowed.");
      } else {
        toast.success("Login successful!");
        navigate(location.state || "/");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || isPending) {
    return <Loading />;
  }

  return (
    <div className="card bg-base-100 w-full max-w-[400px] mx-auto shrink-0 shadow-2xl my-16">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">
          Welcome <span className="text-primary">Back</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="border p-2 border-gray-300 rounded  outline-primary w-full"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>


          <div className="relative">
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="border p-2 border-gray-300 rounded outline-primary  w-full pr-10"
              placeholder="Password"
            />
            <span
              className="absolute right-3 top-[50%] cursor-pointer text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

 
          <button type="submit" className="btn btn-primary w-full mt-4">
            Login
          </button>
        </form>

        <p className="text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>

        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
