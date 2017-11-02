import { connect } from 'react-redux';
import ArticleIndex from './article_index';
import { turnOffLoading, turnOnLoading } from '../../actions/ui_actions';
import { requestCollections, receiveErrors } from '../../actions/collection_actions';


const mapStateToProps = (state) => {
  let articles;
  // Just in case we refresh from the article index page, and articles
  // aren't bootstrapped.
  if (Object.keys(state.entities.articles).length > 0) {
    articles = state.session.currentUser.read_article_ids.map( (id) => {
      return state.entities.articles[id];
    });
  }
  return {
    header: "Recently Read",
    articles: articles,
    sidebarVisible: state.ui.showSidebar,
    loading: state.ui.articlesIndex,
    feeds: state.entities.feeds
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestCollections: () => dispatch(requestCollections()),
    turnOffLoading: () => dispatch(turnOffLoading('articlesIndex')),
    turnOnLoading: () => dispatch(turnOnLoading('articlesIndex'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleIndex);
