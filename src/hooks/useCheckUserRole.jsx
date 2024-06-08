import useAxiosPublic from "./useAxiosPublic";

const useCheckUserRole = async (userEmail) => {
  const axiosPublic = useAxiosPublic();

  const res = await axiosPublic.get(`/check-user-role/${userEmail}`);
  const resData = await res.data;
  console.log(resData);
  return resData;
};

export default useCheckUserRole;
