// Input focus cursor reference:
// https://coderwall.com/p/0iz_zq/how-to-put-focus-at-the-end-of-an-input-with-react-js

import React from 'react';
import * as FeedUtil from '../../util/feed_util';
import Dropdown from 'react-dropdown';

class DiscoverSourcesIndexItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleAddToCollection = this.handleAddToCollection.bind(this);
  }

  handleClick(e) {
    if (this.props.isFollowed) {
      this.props.turnOnLoading();
      FeedUtil.unfollowFeeds([this.props.feed.id])
        .then( (res) => this.props.requestCollections())
        .then( (res) => this.props.turnOffLoading());
    }
  }

  handleAddToCollection(e) {
    this.props.turnOnLoading();
    FeedUtil.subscribeToFeed(e.value, this.props.feed.id)
    .then( (res) => this.props.requestCollections())
    .then( (res) => this.props.turnOffLoading());
  }

  render() {
    let feed = this.props.feed;
    let dropdownOptions = this.props.collections.map( (collection) => {
      return {
        value: collection.id,
        label: collection.name
      };
    });
    return (
      <div className="discover-feed-row">
        <div className="discover-feed-row-image-title-wrapper">
          <div className="discover-feed-row-image">
            <img src={feed.image_url} />
          </div>
          <div className="discover-feed-row-title">
            {feed.title}
          </div>
        </div>
        <div className="follow-unfollow-button">
        {this.props.isFollowed ?
          <div
            onClick={this.handleClick}
            className="discover-feed-is-followed"
          >
            <div className="no-hover">Following</div>
            <div className="yes-hover">Unfollow</div>
          </div> :

          <div
            className="edit-not-follow"
          >
          <Dropdown
            options={dropdownOptions}
            onChange={this.handleAddToCollection}
            value={null}
            placeholder="Follow"
            />
          </div>
        }
        </div>
      </div>
    );
  }
}

export default DiscoverSourcesIndexItem;
