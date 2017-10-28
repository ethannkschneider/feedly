import React from "react";
import CollectionIndexItem from './collection_index_item';
import LoadingSpinner from '../loading_spinner';

class CollectionIndex extends React.Component {

  constructor(props) {
    super(props);

    this.renderCollectionItems = this.renderCollectionItems.bind(this);
  }

  componentDidMount() {
    this.props.turnOnLoading();
    this.props.requestCollections()
      .then( (res) => this.props.turnOffLoading());
  }

  renderCollectionItems() {
    let collectionItems = null;
    if (!this.props.loading) {
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
        {this.props.loading ?
          <div className="collection-index-spinner">
            <LoadingSpinner />
          </div>
          :
          <div className="collection-index-wrapper">
            <div className="today-header"><h1>Today</h1></div>
            <div className="collection-index-loaded">
              {collectionItems}
            </div>
          </div>
        }
      </div>
    );
  }
}
export default CollectionIndex;
