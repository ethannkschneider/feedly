import React from 'react';

class CollectionIndexArticleIndexItem extends React.Component {

  constructor(props) {
    super(props);
    // For later: if it's clicked, expand; if it's read, un-bold it.
    this.state = {
      isExpanded: false,
      isRead: false,
      isBookmarked: false
    };

    this.articleSummary = this.articleSummary.bind(this);
    this.cssBookmarkClass = this.cssBookmarkClass.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
  }

  toggleBookmark() {
    this.setState({ isBookmarked: !this.state.isBookmarked });
  }

  cssBookmarkClass() {
    return this.state.isBookmarked ?
      "collections-index-article-index-item-bookmarked" :
      "collections-index-article-index-item-not-bookmarked";
  }

  articleSummary() {
    // If some articles have nil for summary, we'll try to use their content.
    return this.props.article.summary || this.props.article.content;
  }

  render() {
    return (
      <li className="collections-index-article-index-item">
        <div onClick={this.toggleBookmark} className={this.cssBookmarkClass()}>
          <i className="material-icons">bookmark_border</i>
        </div>
        <div className="collections-index-article-index-item-feed-name">
          {this.props.articleFeedName}
        </div>
        <div className="collections-index-article-index-item-headline">
          {this.props.article.headline}
        </div>
        <div className="collections-index-article-index-item-short-summary">
          {this.articleSummary()}
        </div>
      </li>
    );
  }
}

export default CollectionIndexArticleIndexItem;
