import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useTutor() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isTutor, isPending: isTutorLoading } = useQuery({
    queryKey: ["isTutorRole"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/tutor/${user.email}`);
      const data = await res.data;
      return data;
    },
  });
  return [isTutor, isTutorLoading];
}

export default useTutor;
