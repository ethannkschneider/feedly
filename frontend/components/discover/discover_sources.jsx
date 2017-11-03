import React from 'react';
import LoadingSpinner from '../loading_spinner';
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

  renderSearchRows() {
    return this.state.searchResults.map( (feed) => {
      let isFollowed = this.props.followedFeeds.includes(feed.id);
      return (
        <DiscoverSourcesIndexItem
          key={feed.id}
          feed={feed}
          isFollowed={isFollowed}
          turnOnLoading={this.props.turnOnLoading}
          turnOffLoading={this.props.turnOffLoading}
          requestCollections={this.props.requestCollections}
          collections={this.props.collections}
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
          <div className="discover-header-wrapper">
            <h1 className="discover-header">
              What sources do you want to follow?
            </h1>
          </div>
          <div className="discover-search-input-wrapper">
            <input
              id="discover-search-input"
              autoFocus
              onFocus={this.moveCursorToEnd}
              type="text"
              onChange={this.linkInputToState}
              value={this.state.searchText}
              />
            <i className="material-icons">search</i>
          </div>
          <div className="search-results-table-header">
            <h1 className="discover-search-results-header">Results</h1>
          </div>
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
