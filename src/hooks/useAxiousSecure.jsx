import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/authContext/AuthContext";

const axiosInstance = axios.create({
  baseURL: `https://jobtica-server.vercel.app`,
});
const useAxiousSecure = () => {
  const { user, logOutUser, setLoading } = useContext(AuthContext);

  axiosInstance.interceptors.request.use((config) => {
    if (user && user.accessToken) {
      config.headers.authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401 || error.status === 403) {
        logOutUser()
          .then(() => {
            toast.error("sign out user for authentication");
            setLoading(false);
          })
          .catch((err) =>
            toast.error("Something Went Wrong. Please Try Again")
          );
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiousSecure;
