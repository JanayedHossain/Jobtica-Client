import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiousSecure";
import { FcGoogle } from "react-icons/fc";
import Loading from "../loading/Loading";

const SocialLogin = () => {
  const { googleLogin, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await googleLogin();
      const user = result.user;

      const token = await user.getIdToken();

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "employee",
        bank_account_no: "123456789",
        salary: 20000,
        designation: "Employee",
        isVerified: false,
        status: "active",
        created_at: new Date().toISOString(),
      };

      const response = await axiosSecure.post("/create-user", userInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Login successful");
      setLoading(false);

      navigate(location.state?.from || "/");
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center justify-center"
      >
        <FcGoogle />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
