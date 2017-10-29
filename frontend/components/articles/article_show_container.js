import { connect } from 'react-redux';
import ArticleShowItem from './article_show_item';

const mapStateToProps = (state, ownProps) => {
  return {
    article: ownProps.article,
    articleFeedName: ownProps.articleFeedName,
    isBookmarked: ownProps.isBookmarked
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // I'm adding the following to this method in the case that I later
  // want an action to be dispatched when the user toggles expand or bookmark
  // (bookmark certainly will need this; not sure about expand -- maybe
  // if I use a modal for certain show views?)
  return {
    toggleExpand: ownProps.toggleExpand,
    toggleBookmark: ownProps.toggleBookmark
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleShowItem);
