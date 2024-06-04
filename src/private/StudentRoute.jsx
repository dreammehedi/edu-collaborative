import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useStudent from "../hooks/useStudent";
import DataLoader from "../shared/data_loader/DataLoader";

function StudentRoute({ children }) {
  const { user, userLoading } = useAuth();
  const [isStudent, isStudentLoading] = useStudent();
  console.log("student route", isStudent);
  const location = useLocation();

  if (userLoading || isStudentLoading) {
    return (
      <div className="flex justify-center items-center py-12 h-screen w-full">
        <DataLoader></DataLoader>
      </div>
    );
  }

  if (user && isStudent) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}
StudentRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default StudentRoute;
