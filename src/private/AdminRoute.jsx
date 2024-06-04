import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import DataLoader from "../shared/data_loader/DataLoader";
import useAdmin from "./../hooks/useAdmin";

function AdminRoute({ children }) {
  const { user, userLoading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (userLoading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center py-12 h-screen w-full">
        <DataLoader></DataLoader>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoute;
