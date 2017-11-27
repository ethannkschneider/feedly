import React from 'react';
import ArticleShowContainer from './article_show_container';

class ArticleIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isRead: this.props.isRead,
      isBookmarked: false
    };

    this.articleSummary = this.articleSummary.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        isExpanded: false
      });
    }
  }

  articleSummary() {
    // If some articles have nil for summary, we'll try to use their content.
    return this.props.article.teaser;
  }

  toggleExpand(e) {
    e.preventDefault();
    this.setState({  isExpanded: !this.state.isExpanded });
  }

  render() {
    if (this.state.isExpanded) {
      return (
        <ArticleShowContainer
          toggleExpand={this.toggleExpand}
          toggleBookmark={this.toggleBookmark}
          article={this.props.article}
          articleFeedName={this.props.FeedName}
          isBookmarked={this.state.isBookmarked}
        />
      );
    } else {
      return (
        <div className="article-index-item-wrapper">
          <div className="article-index-item-image">
            <img src={this.props.article.image_url} />
          </div>
          <div className="article-index-item-words">
            <div
              onClick={this.toggleExpand}
              className="article-index-item-headline">
              {this.props.article.headline}
            </div>
            <div className="article-index-item-byline">
              by {this.props.article.author}
            </div>
            <div className="article-index-item-summary">
              {this.articleSummary()}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ArticleIndexItem;
