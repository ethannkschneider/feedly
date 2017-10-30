import { connect } from 'react-redux';
import OrganizeSources from './organize_sources';
import {
  requestCollections, requestCollection,
  createCollection, deleteCollection,
  receiveErrors, clearErrors } from '../../actions/collection_actions';
import { turnOffLoading, turnOnLoading } from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  // Maybe change the loading slice of state to be general and not
  // specific to components?
  return {
    collections: Object.values(state.entities.collections),
    feeds: Object.values(state.entities.feeds),
    loading: state.ui.organizeSources,
    sidebarVisible: state.ui.showSidebar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    turnOffLoading: () => dispatch(turnOffLoading('organizeSources')),
    turnOnLoading: () => dispatch(turnOnLoading('organizeSources')),
    requestCollections: () => dispatch(requestCollections())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizeSources);
