import { connect } from "react-redux";
import Signup from "../components/Signup";
import { loginAction } from "../services/Actions/actions";

const mapStateToProps = (state) => ({
  // userData: state,
});

const mapDispatchToProps = (dispatch) => ({
  // userInfoHandler: (data) => dispatch(loginAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
