import { connect } from 'react-redux';
import WelcomePage from './welcome_page';
import { clearErrors, login } from '../../actions/session_actions';
import {
  showSignupModal,
  showLoginModal,
  hideModals } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    modalType: state.modals.modalType,
    isModalOpen: Boolean(state.modals.modalType)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSignupModal: () => dispatch(showSignupModal()),
    showLoginModal: () => dispatch(showLoginModal()),
    hideModals: () => dispatch(hideModals()),
    clearErrors: () => dispatch(clearErrors()),
    demoLogin: () => dispatch(login({
      email: 'readly-demo@demo.com',
      password: 'password'
    }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
