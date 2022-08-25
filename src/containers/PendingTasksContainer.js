import { connect } from "react-redux";
import PendingTasks from "../components/PendingTasks";

const mapStateToProps = (state) => ({
  userData: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PendingTasks);
