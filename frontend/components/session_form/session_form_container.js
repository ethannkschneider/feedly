import { connect } from 'react-redux';
import { login, signup, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';
import {
  showSignupModal,
  showLoginModal,
  hideModals } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session,
    formType: ownProps.location.pathname.slice(1)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.location.pathname.slice(1);
  const processForm = (formType === 'welcome/login') ? login : signup;
  return {
    processForm: (user) => dispatch(processForm(user)),
    clearErrors: () => dispatch(clearErrors()),
    showSignupModal: () => dispatch(showSignupModal()),
    showLoginModal: () => dispatch(showLoginModal()),
    hideModals: () => dispatch(hideModals())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
