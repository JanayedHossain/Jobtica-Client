import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (user && user.email) {
    return children;
  } else {
    return <Navigate to={"/login"} state={location.pathname} />;
  }
};

export default PrivateRoute;
