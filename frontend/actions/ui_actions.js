export const TURN_OFF_LOADING = "TURN_OFF_LOADING";
export const TURN_ON_LOADING = "TURN_ON_LOADING";

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
