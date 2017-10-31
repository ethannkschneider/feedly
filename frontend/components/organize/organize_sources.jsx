import React from 'react';
import LoadingSpinner from '../loading_spinner';
import OrganizeSourcesIndexItem from'./organize_sources_index_item';
import merge from 'lodash/merge';
import Dropdown from 'react-dropdown';

class OrganizeSources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSources: [],
      addFeedText: ""
    };
    this.cssClassOrganizeWrapper = this.cssClassOrganizeWrapper.bind(this);
    this.renderSources = this.renderSources.bind(this);
    this.selectOrUnselectSource = this.selectOrUnselectSource.bind(this);
    this.handleReorganizeSources = this.handleReorganizeSources.bind(this);
    this.handleUnfollowSources = this.handleUnfollowSources.bind(this);
    this.handleDeleteCollection = this.handleDeleteCollection.bind(this);
    this.handleAddNewCollection = this.handleAddNewCollection.bind(this);
    this.linkInputToState = this.linkInputToState.bind(this);
  }

  componentDidMount() {
    this.props.turnOnLoading();
    this.props.requestCollections()
      .then( (res) => this.props.turnOffLoading());
  }

  linkInputToState(e) {
    this.setState({ addFeedText: e.target.value });
  }

  selectOrUnselectSource(feedId) {
    if (this.state.selectedSources.includes(feedId)) {
      let newSources = this.state.selectedSources.slice(0);
      let feedIdIndex = this.state.selectedSources[feedId];
      newSources.splice(feedIdIndex, 1);
      this.setState({
        selectedSources: newSources
      });
    } else {
      this.setState({
        selectedSources: this.state.selectedSources.concat(feedId)
      });
    }
  }

  handleDeleteCollection(e) {
    if (e.value) {
      this.props.turnOnLoading();
      this.props.deleteCollection(e.value)
        .then( (res) => this.props.requestCollections())
        .then( (res) => this.props.turnOffLoading());
    }
  }

  handleAddNewCollection(e) {
    // don't allow empty names!
    if (this.state.addFeedText) {
      this.props.turnOnLoading();
      this.props.createCollection({ name: this.state.addFeedText })
        .then( (res) => {
          this.props.turnOffLoading();
          this.setState({ addFeedText: ""});
        });
    }
  }

  handleReorganizeSources() {

  }

  handleUnfollowSources() {

    let turnOnLoading = this.props.turnOnLoading.bind(this);
    let unsubscribeFromFeed = this.props.unsubscribeFromFeed.bind(this);
    let requestCollections = this.props.requestCollections.bind(this);
    let turnOffLoading = this.props.turnOffLoading.bind(this);
    let receiveErrors = this.props.receiveErrors.bind(this);
    if (this.state.selectedSources.length > 0) {
      let feedIdsToDelete = this.state.selectedSources;

      // Iterate through all selected feeds, then for each feed, iterate
      // through collectionIds to remove each subscription (since each feed can
      // be associated with multiple collections by the same user.)

      feedIdsToDelete.forEach( (feedId) => {
        this.props.feedObjects[feedId].collectionIds.forEach( (collectionId) => {
          turnOnLoading();
          unsubscribeFromFeed(collectionId, feedId)
            .then( (res) => requestCollections())
            .then( (res) => {
              turnOffLoading();
              this.setState({
                selectedSources: []
              });
            });
        });
      });
    }
  }

  renderSources() {
    return this.props.feeds.map( (feed) => {
      return (
        <OrganizeSourcesIndexItem
          feed={feed}
          selectOrUnselectSource={this.selectOrUnselectSource}
          key={feed.id}
        />
      );
    });
  }

  cssClassOrganizeWrapper () {
    return (this.props.sidebarVisible) ?
      "organize-sources-sidebar-open" :
      "organize-sources-sidebar-closed";
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="collection-index-spinner">
          <LoadingSpinner />
        </div>
      );
    } else {
      const dropdownOptions = this.props.collections.map( (collection) => {
        return {
          value: collection.id,
          label: collection.name
        };
      });
      return (
        <div className={this.cssClassOrganizeWrapper()}>
          <div className="organize-sources-wrapper">
            <div className="edit-collections-buttons-wrapper">
              <div className="add-new-collection">
                <input
                  type="text"
                  onChange={this.linkInputToState}
                  value={this.state.addFeedText}
                />
                <div className="add-new-collection-bottom-wrapper">
                  <div className="add-new-collection-label">
                    Create New Collection:
                  </div>
                  <div
                    onClick={this.handleAddNewCollection}
                    className="add-new-collection-button">
                    go!
                  </div>
                </div>
              </div>
              <Dropdown
                options={dropdownOptions}
                onChange={this.handleDeleteCollection}
                value={null}
                placeholder="Delete Collection"
                />
            </div>
            <div className="organize-sources-header">
              <h1>Organize Sources</h1>
              <h2>Following {this.props.feeds.length} sources</h2>
            </div>
            <div className="filter-sources">
              <div className="filter-sources-dropdown">
                <h3>Feed</h3>
              </div>

              <div className="filter-sources-search">
                <h3>Search</h3>
              </div>
            </div>
            <table className="organize-sources-edit-sources-wrapper">
              <thead>
                <tr>
                  <th className="organize-sources-table-header">
                    <div className="organize-sources-source-name">
                      Source Name</div>
                    <div className="organize-sources-buttons">
                      <div onClick={this.handleReorganizeSources}>
                        Reorganize</div>
                      <div onClick={this.handleUnfollowSources}>Unfollow</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderSources()}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default OrganizeSources;
