import { connect } from 'react-redux';
import { logout } from './../../actions/session_actions';
import NavBar from './nav_bar';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  debugger
  return {
    logout: () => dispatch(logout()),
    openModal: () => ownProps.openModal()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
