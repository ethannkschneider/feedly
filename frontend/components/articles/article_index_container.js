import { connect } from 'react-redux';
import ArticleIndex from './article_index';
import { withRouter } from 'react-router-dom';
import { requestCollections, receiveErrors } from '../../actions/collection_actions';
import { turnOffLoading, turnOnLoading } from '../../actions/ui_actions';


const mapStateToProps = (state, ownProps) => {
  // formType will determine if we are renderng the collection view or the feed view
  let formType, header, feeds, articles;
  if (Object.keys(state.entities.collections).length > 0) {
    formType = ownProps.match.params.collectionId ? 'collection' : 'feed';
    header = (formType === 'collection') ?
      state.entities.collections[ownProps.match.params.collectionId].name :
      state.entities.feeds[ownProps.match.params.feedId].title;
    feeds = (formType === 'collection') ?
      state.entities.collections[ownProps.match.params.collectionId].feedIds.map( (feedId) => {
        return state.entities.feeds[feedId];
      }):
      [state.entities.feeds[ownProps.match.params.feedId]];
      // Finally, we extract the relevent articles based on the form type!
    articles = [];
      feeds.forEach( (feed) => {
        feed.articleIds.forEach( (articleId) => {
          let article = state.entities.articles[articleId];
          articles.push(article);
        });
      });
  }
  return {
    formType,
    header,
    articles,
    sidebarVisible: state.ui.showSidebar,
    loading: state.ui.articlesIndex,
    feeds: state.entities.feeds,
    readArticlesById: state.session.currentUser.read_articles_by_id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestCollections: () => dispatch(requestCollections()),
    turnOffLoading: () => dispatch(turnOffLoading('articlesIndex')),
    turnOnLoading: () => dispatch(turnOnLoading('articlesIndex'))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleIndex));
