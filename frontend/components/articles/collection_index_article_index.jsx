import React from 'react';
import CollectionIndexArticleIndexItem
  from './collection_index_article_index_item';

class CollectionIndexArticleIndex extends React.Component {
  constructor(props) {
    super(props);

    this.renderArticleIndexItems = this.renderArticleIndexItems.bind(this);
  }

  renderArticleIndexItems() {
    // Currently, neither jbuilder nor articles reducer converts
    // article.feed_id to article.feedId, so I'm using ruby syntax here:
    // ** For now, we render first 10 articles. Later we need to figure
    // ** how to order them so that 1) read articles don't show up and
    // ** 2) order is either random or optimized.
    let feeds = this.props.feeds;
    return this.props.articles.slice(0, 12).map( (article, idx) => {
      let articleFeedName = feeds[article.feed_id].title;
      return (
        <CollectionIndexArticleIndexItem
          key={idx}
          article={article}
          articleFeedName={articleFeedName}
        />
      );
    });
  }

  render() {
    return (
      <ul className="collection-index-article-index">
        {this.renderArticleIndexItems()}
      </ul>
    );
  }
}

export default CollectionIndexArticleIndex;
