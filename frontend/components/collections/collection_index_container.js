import { connect } from 'react-redux';
import CollectionIndex from './collection_index';
import {
  requestCollections, requestCollection,
  createCollection, deleteCollection,
  receiveErrors, clearErrors } from '../../actions/collection_actions';

const mapStateToProps = (state) => {
  debugger
  return {
    collections: Object.keys(state.entities.collections).map( (id) => {
      return state.entities.collections[id];
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionIndex);
