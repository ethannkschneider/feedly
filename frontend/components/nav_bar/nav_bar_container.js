import { connect } from 'react-redux';
import { logout } from './../../actions/session_actions';
import NavBar from './nav_bar';
import { showLoginModal, hideModals } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    showLoginModal: () => dispatch(showLoginModal()),
    hideModals: () => dispatch(hideModals())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
