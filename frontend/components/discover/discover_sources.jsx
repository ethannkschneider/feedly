import React from 'react';
import LoadingSpinner from '../loading_spinner';
import Dropdown from 'react-dropdown';
import DiscoverSourcesIndexItem from './discover_sources_index_item';
import * as FeedUtil from '../../util/feed_util';

class DiscoverSources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchResults: []
    };

    this.linkInputToState = this.linkInputToState.bind(this);
    this.handleAddFeed = this.handleAddFeed.bind(this);
    this.renderSearchRows = this.renderSearchRows.bind(this);
    this.cssClassDiscoverWrapper = this.cssClassDiscoverWrapper.bind(this);
    this.moveCursorToEnd = this.moveCursorToEnd.bind(this);
  }

  componentDidMount() {
    this.props.turnOnLoading();
    this.props.requestCollections()
    .then( (res) => this.props.turnOffLoading());
  }

  linkInputToState(e) {
    this.setState({ searchText: e.target.value });
    this.props.turnOnLoading();
    FeedUtil.fetchFeeds(e.target.value)
      .then( (fetchedFeeds) => {
        this.props.turnOffLoading();
        this.setState({ searchResults: Object.values(fetchedFeeds)});
      });
  }

  moveCursorToEnd(e) {
    let end = e.target.value;
    e.target.value = "";
    e.target.value = end;
  }

  handleAddFeed(e) {

  }

  renderSearchRows() {
    return this.state.searchResults.map( (feed) => {
      let isFollowed = this.props.followedFeeds.includes(feed.id);
      return (
        <DiscoverSourcesIndexItem
          key={feed.id}
          feed={feed}
          isFollowed={isFollowed}
        />
      );
    });
  }

  cssClassDiscoverWrapper() {
    return (this.props.sidebarVisible) ?
      "discover-sidebar-open" :
      "discover-sidebar-closed";
  }

  render() {
    return(
      <div className={this.cssClassDiscoverWrapper()}>
        <div className="discover-wrapper">
          <h1 className="discover-header">
            What sources do you want to follow?
          </h1>
          <div>
            <input
              autoFocus
              onFocus={this.moveCursorToEnd}
              type="text"
              onChange={this.linkInputToState}
              value={this.state.searchText}
              />
          </div>
          <div className="search-results-table-header">Results</div>
          {this.props.loading ?
          <div className="discover-sources-spinner">
            <LoadingSpinner />
          </div> :
          <div className="search-results-table">
            {this.renderSearchRows()}
          </div>
        }
      </div>
    </div>
    );
  }
}


export default DiscoverSources;
