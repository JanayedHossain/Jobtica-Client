import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiousSecure from "./useAxiousSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiousSecure();

  const {
    data = {},
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-role?email=${user?.email}`);
      return res.data; // পুরো data
    },
  });

  return {
    role: data.role || "user", // role আলাদা
    details: data, // পুরো res.data
    roleLoading: authLoading || roleLoading,
    refetch,
  };
};

export default useUserRole;
