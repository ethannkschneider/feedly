import * as CollectionApiUtil from '../util/collection_api_util';

export const RECEIVE_COLLECTIONS = "RECEIVE_COLLECTIONS";
export const RECEIVE_COLLECTION = "RECEIVE_COLLECTION";
export const REMOVE_COLLECTION = "REMOVE_COLLECTION";
export const RECEIVE_COLLECTION_ERRORS = "RECEIVE_COLLECTION_ERRORS";
export const CLEAR_COLLECTION_ERRORS= "CLEAR_COLLECTION_ERRORS";

export const receiveCollections = (collections) => {
  return {
      type: RECEIVE_COLLECTIONS,
      collections
  };
};

export const receiveCollection = (collection) => {
  return {
      type: RECEIVE_COLLECTION,
      collection
  };
};

export const removeCollection = (collectionId) => {
  return {
      type: REMOVE_COLLECTION,
      collectionId
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_COLLECTION_ERRORS,
    errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_COLLECTION_ERRORS,
  };
};

export const requestCollections = () => (dispatch) => {
  return CollectionApiUtil.fetchCollections()
    .then( (collections) => dispatch(receiveCollections(collections)),
      (errors) => dispatch(receiveErrors(errors)));
};

export const requestCollection = (collectionId) => (dispatch) => {
  return CollectionApiUtil.fetchCollection(collectionId)
    .then( (collection) => dispatch(receiveCollection(collection)),
      (errors) => dispatch(receiveErrors(errors)));
};

export const createCollection = (collection) => (dispatch) => {
  return CollectionApiUtil.createCollection(collection)
    .then( (newCollection) => dispatch(receiveCollection(newCollection)),
      (errors) => dispatch(receiveErrors(errors)));
};

export const deleteCollection = (collectionId) => (dispatch) => {
  return CollectionApiUtil.deleteCollection(collectionId)
    .then( (deletedCollection) => dispatch(removeCollection(deletedCollection.id)),
      (errors) => dispatch(receiveErrors(errors)));
};











////
