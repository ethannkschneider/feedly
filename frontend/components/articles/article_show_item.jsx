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
        <div className="close-article-show-arrow"
          onClick={this.props.toggleExpand}>
          <i className="material-icons">keyboard_arrow_up</i>
        </div>
        <div className="expanded-article-show-header">
          <div className="expanded-article-show-headline">
            <h1>{this.props.article.headline}</h1>
          </div>
          <div className="expanded-article-show-byline">
            <h6>{this.props.articleFeedName} by {this.props.article.author}</h6>
              <button onClick={this.props.toggleBookmark}
                className={this.cssBookmarkClass()}>
                <i className="material-icons">
                  {this.props.isBookmarked ? "bookmark" : "bookmark_border"}</i>
              </button>
          </div>
        </div>
        <div>
          <img src={this.props.article.image_url}
            className="expanded-article-show-image"
          />
        </div>
        <div className="expanded-article-show-summary-content">
          <p>{this.articleSummary()}</p>
        </div>
        <div className="expanded-article-show-visit-website">
          {this.props.article.url ?
            <button>Visit Website</button> : ""
          }
        </div>
      </div>
    );
  }
}


export default ArticleShowItem;
