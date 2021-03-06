import { connect } from 'react-redux';
import ArticleShowItem from './article_show_item';
import { createRead, deleteRead } from '../../actions/read_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    article: ownProps.article,
    articleFeedName: ownProps.articleFeedName,
    isBookmarked: ownProps.isBookmarked,
    isRead: state.session.currentUser.read_article_ids.includes(ownProps.article.id)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // I'm adding the following to this method in the case that I later
  // want an action to be dispatched when the user toggles expand or bookmark
  // (bookmark certainly will need this; not sure about expand -- maybe
  // if I use a modal for certain show views?)
  return {
    toggleExpand: ownProps.toggleExpand,
    toggleBookmark: ownProps.toggleBookmark,
    createRead: (articleId) => dispatch(createRead(articleId)),
    deleteRead: (articleId) => dispatch(deleteRead(articleId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleShowItem);
