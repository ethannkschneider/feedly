import React from 'react';
import ArticleShowContainer from './article_show_container';

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
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleBookmark(e) {
    e.preventDefault();
    this.setState({ isBookmarked: !this.state.isBookmarked });
  }

  toggleExpand(e) {
    e.preventDefault();
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  cssBookmarkClass() {
    return this.state.isBookmarked ?
      "bookmark collections-index-article-index-item-bookmarked" :
      "bookmark collections-index-article-index-item-not-bookmarked";
  }

  articleSummary() {
    // If some articles have nil for summary, we'll try to use their content.
    return this.props.article.summary || this.props.article.content;
  }

  render() {
    if (this.state.isExpanded) {
      return (
        <ArticleShowContainer
          toggleExpand={this.toggleExpand}
          toggleBookmark={this.toggleBookmark}
          article={this.props.article}
          articleFeedName={this.props.articleFeedName}
          isBookmarked={this.state.isBookmarked}
        />
      );
    } else {
      return (
        <li className="collections-index-article-index-item">
          <button onClick={this.toggleBookmark}
            className={this.cssBookmarkClass()}>
            <i className="material-icons">
              {this.state.isBookmarked ? "bookmark" : "bookmark_border"}</i>
          </button>
          <div className="collections-index-article-index-item-feed-name">
            {this.props.articleFeedName}
          </div>
          <div className="collections-index-article-index-item-headline">
            <span onClick={this.toggleExpand}>{this.props.article.headline}</span>
          </div>
          <div className="collections-index-article-index-item-short-summary">
            <span onClick={this.toggleExpand}>{this.articleSummary()}</span>
          </div>
        </li>
      );

    }
  }
}

export default CollectionIndexArticleIndexItem;
