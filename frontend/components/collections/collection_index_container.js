import { connect } from 'react-redux';
import CollectionIndex from './collection_index';
import {
  requestCollections, requestCollection,
  createCollection, deleteCollection,
  receiveErrors, clearErrors } from '../../actions/collection_actions';
import { turnOffLoading, turnOnLoading } from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  return {
    collections: Object.keys(state.entities.collections).map( (id) => {
      return state.entities.collections[id];
    }),
    feeds: state.session.currentUser.feed_ids.map( (id) => state.entities.feeds[id]),
    articles: Object.values(state.entities.articles),
    loading: state.ui.collectionsIndex,
    sidebarVisible: state.ui.showSidebar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestCollections: () => dispatch(requestCollections()),
    requestCollection: (collectionId) => dispatch(requestCollection(collectionId)),
    createCollection: (collection) => dispatch(createCollection(collection)),
    deleteCollection: (collectionId) => dispatch(deleteCollection(collectionId)),
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    clearErrors: () => dispatch(clearErrors()),
    turnOffLoading: () => dispatch(turnOffLoading('collectionsIndex')),
    turnOnLoading: () => dispatch(turnOnLoading('collectionsIndex'))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionIndex);
