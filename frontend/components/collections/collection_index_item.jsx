import React from 'react';

class CollectionIndexItem extends React.Component {

  constructor(props) {
    super(props);

  }
  render() {
    //Here we will render our articles! (later)
    return (
      <div className="collection-index-item">
        <div className="collection-name">
          New in <span className="bold">{this.props.collection.name}</span>
        </div>
        {this.props.collection.feedIds }
        <h3>Article One</h3>
        <h3>Article Two</h3>
        <h3>Article Three</h3>
      </div>
    );
  }
}

export default CollectionIndexItem;
