import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: ["isAdminRole"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user.email}`);
      const data = await res.data;
      return data;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
