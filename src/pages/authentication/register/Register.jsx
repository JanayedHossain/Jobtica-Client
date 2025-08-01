import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import SocialLogin from "../../../components/social-login/SocialLogin";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import { toast } from "react-toastify";
import Loading from "../../../components/loading/Loading";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const axiousSecure = useAxiousSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const { createUser, updateUser, loading, setLoading } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url);
  };

  const onSubmit = (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      photo: profilePic,
      role: data.role,
      bank_account_no: data.bank,
      salary: parseInt(data.salary),
      designation: data.designation,
      isVerified: false,
      status: "active",
      created_at: new Date().toISOString(),
    };

    createUser(data.email, data.password)
      .then((res) => {
        if (res.user) {
          updateUser(data.name, profilePic)
            .then((result) => {
              axiousSecure
                .post("/create-user", userInfo)
                .then((result) => {
                  if (result.data.upsertedId) {
                    toast.success("Signup Successfull");
                    setLoading(false);
                    reset();
                    navigate(location.state ? location.state : "/");
                  } else {
                    setLoading(false);
                    toast.error("something went wrong");
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  toast.error("something went wrong");
                });
            })
            .catch((err) => {
              toast.error("something went wrong");
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="card bg-base-100 w-[95%] md:w-[80%] max-w-4xl mx-auto shrink-0 shadow-2xl my-16">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">
          Create <span className="text-primary">Account</span>
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="label">Full Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="border p-2 rounded-md border-gray-200 outline-primary w-full"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border p-2 rounded-md border-gray-200 outline-primary w-full"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          <div>
            <label className="label">Profile Picture</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input focus:outline focus:outline-primary border-gray-200 w-full"
            />
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                })}
                className="border p-2 rounded-md border-gray-200 outline-primary w-full pr-10"
                placeholder="Password"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">At least 6 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Must include uppercase & special character
              </p>
            )}
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className="border p-2 rounded-md border-gray-200 outline-primary w-full pr-10"
                placeholder="Confirm Password"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer text-xl"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <label className="label">Bank Account No</label>
            <input
              type="text"
              {...register("bank", { required: true })}
              className="border p-2 rounded-md border-gray-200 outline-primary w-full"
              placeholder="Account Number"
            />
            {errors.bank && <p className="text-red-500">Required</p>}
          </div>

          <div>
            <label className="label">Salary</label>
            <input
              type="number"
              {...register("salary", { required: true })}
              className="border p-2 rounded-md border-gray-200 outline-primary w-full"
              placeholder="Your Salary"
            />
            {errors.salary && <p className="text-red-500">Required</p>}
          </div>

          <div>
            <label className="label">Select Role</label>
            <select
              {...register("role", { required: true })}
              className="select border-gray-200 focus:outline-primary w-full"
            >
              <option value="">Select a Role</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
            {errors.role && <p className="text-red-500">Role is required</p>}
          </div>

          <div>
            <label className="label">Designation</label>
            <input
              type="text"
              {...register("designation", { required: true })}
              className="border p-2 rounded-md border-gray-200 outline-primary w-full"
              placeholder="Eg: Sales Assistant"
            />
            {errors.designation && <p className="text-red-500">Required</p>}
          </div>

          <div className="md:col-span-2 mt-4">
            <button className="btn btn-primary w-full">Register</button>
            <p className="text-center mt-2 mb-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Login
              </Link>
            </p>
          </div>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
