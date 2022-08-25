import { connect } from "react-redux";
import CompletedTasks from "../components/CompletedTasks";
import { recepientAction } from "../services/Actions/actions";

const mapStateToProps = (state) => ({
  userData: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTasks);
