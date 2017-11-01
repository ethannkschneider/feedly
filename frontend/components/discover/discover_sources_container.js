import { connect } from 'react-redux';
import { turnOffLoading, turnOnLoading } from '../../actions/ui_actions';
import {
  requestCollections, requestCollection,
  receiveErrors, clearErrors
} from '../../actions/collection_actions';

import {
  subscribeToFeed,
  unsubscribeFromFeed
} from '../../actions/feed_actions';

import DiscoverSources from './discover_sources';

const mapStateToProps = (state) => {
  return {
    collections: Object.values(state.entities.collections),
    feeds: Object.values(state.entities.feeds),
    loading: state.ui.discoverSources,
    sidebarVisible: state.ui.showSidebar,
    followedFeeds: state.session.currentUser.feed_ids
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    turnOffLoading: () => dispatch(turnOffLoading('discoverSources')),
    turnOnLoading: () => dispatch(turnOnLoading('discoverSources')),
    requestCollections: () => dispatch(requestCollections())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DiscoverSources);
