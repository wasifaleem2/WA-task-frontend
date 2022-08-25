import { connect } from "react-redux";
import Signin from "../components/Signin";
import { loginAction } from "../services/Actions/actions";

const mapStateToProps = (state) => ({
  // userData: state,
});

const mapDispatchToProps = (dispatch) => ({
  userDataHandler: (userCredentials) => dispatch(loginAction(userCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
