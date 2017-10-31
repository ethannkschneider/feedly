import { connect } from 'react-redux';
import OrganizeSources from './organize_sources';
import { turnOffLoading, turnOnLoading } from '../../actions/ui_actions';
import {
  requestCollections, requestCollection,
  createCollection, deleteCollection,
  receiveErrors, clearErrors
} from '../../actions/collection_actions';

import {
  subscribeToFeed,
  unsubscribeFromFeed, unfollowFeeds
} from '../../actions/feed_actions';

const mapStateToProps = (state) => {
  return {
    collections: Object.values(state.entities.collections),
    feeds: state.session.currentUser.feed_ids.map( (id) => state.entities.feeds[id]),
    feedObjects: state.entities.feeds,
    loading: state.ui.organizeSources,
    sidebarVisible: state.ui.showSidebar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    turnOffLoading: () => dispatch(turnOffLoading('organizeSources')),
    turnOnLoading: () => dispatch(turnOnLoading('organizeSources')),
    requestCollections: () => dispatch(requestCollections()),
    deleteCollection: (collectionId) => dispatch(deleteCollection(collectionId)),
    createCollection: (collection) => dispatch(createCollection(collection)),
    subscribeToFeed: (colId, feedId) => dispatch(subscribeToFeed(colId, feedId)),
    unsubscribeFromFeed: (colId, feedId) => dispatch(unsubscribeFromFeed(colId, feedId)),
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    unfollowFeeds: (feedIds) => unfollowFeeds(feedIds)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizeSources);
