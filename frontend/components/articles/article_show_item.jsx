import React from 'react';

class ArticleShowItem extends React.Component {

  constructor(props) {
    super(props);

    this.cssBookmarkClass = this.cssBookmarkClass.bind(this);
    this.articleSummary = this.articleSummary.bind(this);
  }

  cssBookmarkClass() {
    return this.props.isBookmarked ?
      "bookmark collections-index-article-index-item-bookmarked" :
      "bookmark collections-index-article-index-item-not-bookmarked";
  }

  articleSummary() {
    // If some articles have nil for summary, we'll try to use their content.
    return this.props.article.summary || this.props.article.content;
  }

  render() {
    return (
      <div className="expanded-article-show-wrapper">
        <div onClick={this.props.toggleExpand}>
          <i className="material-icons">keyboard_arrow_up</i>
        </div>
        <div>
          <h1>{this.props.article.headline}</h1>
        </div>
        <div>
          <h6>{this.props.articleFeedName} by {this.props.article.author}</h6>
        </div>
        <div>
          <button onClick={this.props.toggleBookmark}
            className={this.cssBookmarkClass()}>
            <i className="material-icons">
              {this.props.isBookmarked ? "bookmark" : "bookmark_border"}</i>
          </button>
        </div>
        <div>
          {this.articleSummary()}
        </div>
        <div>
          {this.props.article.url}
        </div>
      </div>
    );
  }
}


export default ArticleShowItem;
