export const SHOW_SIGNUP_MODAL = 'SHOW_SIGNUP_MODAL';
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const HIDE_MODALS = 'HIDE_MODALS';

export const showSignupModal = () => {
  return ({
    type: SHOW_SIGNUP_MODAL,
  });
};

export const showLoginModal = () => {
  return ({
    type: SHOW_LOGIN_MODAL
  });
};

export const hideModals = () => {
  return ({
    type: HIDE_MODALS
  });
};
