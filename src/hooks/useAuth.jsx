import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export default useAuth;
