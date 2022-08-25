import { connect } from "react-redux";
import Header from "../components/Header";
import { logoutAction } from "../services/Actions/actions";

const mapStateToProps = (state) => ({
  userData: state,
});

const mapDispatchToProps = (dispatch) => ({
  userDataHandler: (userCredentials) => dispatch(logoutAction(userCredentials)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
