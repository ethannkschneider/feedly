import { connect } from 'react-redux';
import CollectionIndexArticleIndex from './collection_index_article_index';

const mapStateToProps = (state, ownProps) => {
  // We pass in feedIds as ownProps, so here we extract an array of articleIds
  // for each feed:
  const articleIds = ownProps.feedIds.map( (feedId) => {
    return state.entities.feeds[feedId].articleIds;
  });
  // Since we have a nested array containing arrays of articleIds, we flatten:
  const flattenedArticleIds = articleIds.reduce(
    (acc, el) => acc.concat(el),
    []
  );
  // Finally, we map all articleIds to their full article objects in the state,
  // returning an array of relevant articles:
  const articles = flattenedArticleIds.map( (articleId) => {
    return state.entities.articles[articleId];
  });
  // Now we has good!
  // Map feeds so we can extract the feed name and display it with the article.
  return {
    articles: articles,
    feeds: state.entities.feeds
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionIndexArticleIndex);
