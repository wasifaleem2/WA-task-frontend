import { connect } from "react-redux";
import CreateTask from "../components/CreateTask"
import { recepientAction } from "../services/Actions/actions";

const mapStateToProps = (state) => ({
    userData: state,
  });
  
  const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
