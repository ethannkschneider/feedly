import { connect } from 'react-redux';
import CollectionsIndex from './collections_index';
import {
  requestCollections, requestCollection,
  createCollection, deleteCollection,
  receiveErrors, clearErrors } from '../../actions/collection_actions';

const mapStateToProps = (state) => {
  return {
    collections: Object.keys(state.entities.collections).map( (id) => {
      return state.entities[id];
    }),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestCollections: () => dispatch(requestCollections()),
    requestCollection: (collectionId) => dispatch(requestCollection(collectionId)),
    createCollection: (collection) => dispatch(createCollection(collection)),
    deleteCollection: (collectionId) => dispatch(deleteCollection(collectionId)),
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsIndex);
