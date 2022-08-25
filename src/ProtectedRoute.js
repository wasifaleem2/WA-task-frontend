import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  userData: state,
});

const mapDispatchToProps = (dispatch) => ({});

const ProtectedRoute = ({ userData, children }) => {
  if (userData.User.isLoggedIn == false) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
