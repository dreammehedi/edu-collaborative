import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Button from "../button/Button";

function HandleLogout() {
  // user info
  const { userSignOut } = useAuth();

  // handle logout
  const handleLogout = () => {
    userSignOut()
      .then(() => {
        toast.success("User Logout!");
      })
      .catch(() => {
        toast.error("An error occurred!");
      });
  };
  return (
    <div onClick={handleLogout}>
      <Button name={"Logout"}></Button>
    </div>
  );
}

export default HandleLogout;
