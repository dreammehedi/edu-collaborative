import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useStudent from "../hooks/useStudent";
import DataLoader from "../shared/data_loader/DataLoader";

function TutorRoute({ children }) {
  const { user, userLoading } = useAuth();
  const [isTutor, isTutorLoading] = useStudent();
  const location = useLocation();

  if (userLoading || isTutorLoading) {
    return (
      <div className="flex justify-center items-center py-12 h-screen w-full">
        <DataLoader></DataLoader>
      </div>
    );
  }

  if (user && isTutor) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}
TutorRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TutorRoute;
