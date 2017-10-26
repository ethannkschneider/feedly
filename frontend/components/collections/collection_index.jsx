import React from "react";
import CollectionIndexItem from './collection_index_item';

class CollectionIndex extends React.Component {

  constructor(props) {
    super(props);

    this.renderCollectionItems = this.renderCollectionItems.bind(this);
  }

  componentDidMount() {
    debugger
    this.props.requestCollections();
  }

  renderCollectionItems() {
    debugger
    let collectionItems = null;
    if (this.props.collections) {
      collectionItems = this.props.collections.map( (collection) => {
        return (
          <CollectionIndexItem key={collection.id} collection={collection} />
          );
      });
    }
    return collectionItems;
  }

  render() {
    let collectionItems = this.renderCollectionItems();
    return (
      <div className="collection-index">
        <h1>Today</h1>
        <ul>
          {collectionItems}
        </ul>
      </div>
    );
  }
}
export default CollectionIndex;
