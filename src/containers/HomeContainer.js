import { connect } from "react-redux";
import Home from "../components/Home";

const mapStateToProps = (state) => ({
  userData: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
