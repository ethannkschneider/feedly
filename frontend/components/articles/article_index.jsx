import React from 'react';
import ArticleIndexItem from './article_index_item';
import LoadingSpinner from '../loading_spinner';

class ArticleIndex extends React.Component {
  constructor(props) {
    super(props);

    this.renderArticles = this.renderArticles.bind(this);
    this.cssSidebarVisible = this.cssSidebarVisible.bind(this);
  }

  componentDidMount() {
    if (this.props.articles && this.props.articles.length < 1) {
      this.props.turnOnLoading();
      this.props.requestCollections()
        .then( (res) => this.props.turnOffLoading());
    }
  }

  renderArticles() {
    let feedName;
    if (!this.props.loading && typeof this.props.articles !== 'undefined') {
      return this.props.articles.slice(0, 25).map( (article, idx) => {
        feedName = this.props.feeds[article.feed_id].title;
        return <ArticleIndexItem
          article={article}
          key={idx}
          feedName={feedName}
          isRead={this.props.readArticlesById[article.id]}
          />;
      });
    }
  }

  cssSidebarVisible() {
    return this.props.sidebarVisible ?
      "article-index-sidebar-visible" : "article-index-sidebar-hidden";
  }

  render() {

    return (
      <div className={this.cssSidebarVisible()}>
        {this.props.loading ?
          <div className="collection-index-spinner">
            <LoadingSpinner />
          </div>
          :
          <div className="article-index-wrapper">
            <div className="article-index-header">
              {this.props.header}
            </div>
            <div className="article-index-column">
              {this.renderArticles()}
            </div>
          </div>
        }
      </div>
    );
  }

}

export default ArticleIndex;
