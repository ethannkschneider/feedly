import React from 'react';
import CollectionIndexArticleIndexContainer
  from '../articles/collection_index_article_index_container';

// Props: collection

class CollectionIndexItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="collection-index-item">
        <div className="collection-name">
          New in <span className="bold">{this.props.collection.name}</span>
        </div>
        <CollectionIndexArticleIndexContainer
          feedIds={this.props.collection.feedIds}
        />
      </div>
    );
  }
}

export default CollectionIndexItem;
