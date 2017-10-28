export const TURN_OFF_LOADING = "TURN_OFF_LOADING";
export const TURN_ON_LOADING = "TURN_ON_LOADING";
export const SHOW_SIDEBAR = "SHOW_SIDEBAR";
export const HIDE_SIDEBAR = "HIDE_SIDEBAR";

export const turnOffLoading = (loadingComponent) => {
  return {
    type: TURN_OFF_LOADING,
    loadingComponent
  };
};

export const turnOnLoading = (loadingComponent) => {
  return {
    type: TURN_ON_LOADING,
    loadingComponent
  };
};

export const showSidebar = () => {
  return {
    type: SHOW_SIDEBAR
  };
};

export const hideSidebar = () => {
  return {
    type: HIDE_SIDEBAR
  };
};
