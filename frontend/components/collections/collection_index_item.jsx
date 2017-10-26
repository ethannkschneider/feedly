import React from 'react';

class CollectionIndexItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    //Here we will render our articles! (later)
    return (
      <li>
        <h2>New in {this.props.collection.name}</h2>
        <h3>Article One</h3>
        <h3>Article Two</h3>
        <h3>Article Three</h3>
      </li>
    );
  }
}

export default CollectionIndexItem;
