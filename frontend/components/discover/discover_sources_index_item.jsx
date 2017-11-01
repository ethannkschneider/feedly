import React from 'react';
import * as FeedUtil from '../../util/feed_util';
class DiscoverSourcesIndexItem extends React.Component {

  constructor(props) {
    super(props);

    this.renderFollowedStatus = this.renderFollowedStatus.bind(this);
    this.cssFollowedStatus = this.cssFollowedStatus.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  cssFollowedStatus() {
    return this.props.isFollowed ?
      "discover-feed-is-followed" : "discover-feed-is-not-followed";
  }

  renderFollowedStatus() {
    return this.props.isFollowed ?
      "Following" : "Follow";
  }

  handleClick(e) {
    if (this.props.isFollowed) {
      this.props.turnOnLoading();
      FeedUtil.unfollowFeeds([this.props.feed.id])
        .then( (res) => this.props.requestCollections())
        .then( (res) => this.props.turnOffLoading());
    }
  }

  render() {
    let feed = this.props.feed;
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
        <div
          onClick={this.handleClick}
          className={this.cssFollowedStatus()}>
          <div className="follow-not-edit">
            {this.renderFollowedStatus()}
          </div>
          <div className="edit-not-follow">
            unfollow
          </div>
        </div>
      </div>
    );
  }
}

export default DiscoverSourcesIndexItem;
