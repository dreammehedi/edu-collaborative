import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://edu-collaborate.vercel.app",
});
function useAxiosSecure() {
  const { userSignOut } = useAuth();
  const navigate = useNavigate();

  // axios interceptor requist
  axiosSecure.interceptors.request.use(
    (config) => {
      const userToken = localStorage.getItem("userToken");
      config.headers.authorization = `Bearer ${userToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // axios interceptor response
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const statusCode = error.response?.status;
      if (statusCode === 401 || statusCode === 403) {
        await userSignOut();
        navigate("/login", { replace: true });
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
}

export default useAxiosSecure;
