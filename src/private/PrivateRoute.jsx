import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import DataLoader from "../shared/data_loader/DataLoader";

const PrivateRoute = ({ children }) => {
  const { user, userLoading } = useAuth();
  const location = useLocation();

  if (userLoading) {
    return (
      <div className="flex justify-center items-center py-12 h-screen w-full">
        <DataLoader></DataLoader>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return (
    <Navigate to="/login" state={{ from: location }} replace={true}></Navigate>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
