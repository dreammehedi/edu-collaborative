import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useStudent() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isStudent, isPending: isStudentLoading } = useQuery({
    queryKey: ["isStudentRole"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/student/${user.email}`);
      const data = await res.data;
      return data;
    },
  });
  return [isStudent, isStudentLoading];
}

export default useStudent;
