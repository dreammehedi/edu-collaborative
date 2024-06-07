import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://edu-collaborate.vercel.app/",
});
function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;
