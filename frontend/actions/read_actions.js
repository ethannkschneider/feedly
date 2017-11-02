import * as ReadUtil from '../util/read_util';
import { receiveErrors } from './collection_actions';

export const RECEIVE_READ_IDS = "RECEIVE_READ_IDS";

// note: readIds should be an array
export const receiveReadIds = ({read_article_ids, read_articles_by_id}) => {
  return {
    type: RECEIVE_READ_IDS,
    readArticleIds: read_article_ids,
    readArticlesById: read_articles_by_id
  };
};

export const createRead = (articleId) => (dispatch) => {
  return ReadUtil.createRead(articleId)
    .then( (res) => dispatch(receiveReadIds(res)),
    (errors) => dispatch(receiveErrors(errors)));
};

export const deleteRead = (articleId) => (dispatch) => {
  return ReadUtil.deleteRead(articleId)
  .then( (res) => dispatch(receiveReadIds(res)),
  (errors) => dispatch(receiveErrors(errors)));
};
