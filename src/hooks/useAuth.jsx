import { useContext } from "react";
import { AuthContext } from "../contexts/authContext/AuthContext";

const useAuth = () => {
  const authinfo = useContext(AuthContext);
  return authinfo;
};

export default useAuth;
