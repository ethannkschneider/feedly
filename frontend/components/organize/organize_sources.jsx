import React from 'react';
import LoadingSpinner from '../loading_spinner';
import OrganizeSourcesIndexItem from'./organize_sources_index_item';
import merge from 'lodash/merge';

class OrganizeSources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSources: []
    };
    this.cssClassOrganizeWrapper = this.cssClassOrganizeWrapper.bind(this);
    this.renderSources = this.renderSources.bind(this);
    this.selectOrUnselectSource = this.selectOrUnselectSource.bind(this);
    this.handleReorganizeSources = this.handleReorganizeSources.bind(this);
    this.handleUnfollowSources = this.handleUnfollowSources.bind(this);
  }

  componentDidMount() {
    this.props.turnOnLoading();
    this.props.requestCollections()
      .then( (res) => this.props.turnOffLoading());
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

  handleReorganizeSources() {

  }

  handleUnfollowSources() {

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
      return (
        <div className={this.cssClassOrganizeWrapper()}>
          <div className="organize-sources-wrapper">
            <div className="organize-sources-header">
              <div className="edit-collections-buttons-wrapper">
                <div className="edit-collections-button">
                  Create Collection
                </div>
                <div className="edit-collections-button">
                  Delete Collection
                </div>
              </div>
              <h1>Organize Sources</h1>
              <h2>Following {this.props.feeds.length} sources</h2>
            </div>
            <div className="filter-sources">
              <div className="filter-sources-dropdown">
                <h3>Feed</h3>
              </div>

              <div className="filter-soures-search">
                <h3>Search</h3>
              </div>
            </div>
            <table className="organize-sources-edit-sources-wrapper">
              <th className="organize-sources-table-header">
                <div className="organize-sources-source-name">Source Name</div>
                <div className="organize-sources-buttons">
                  <div onClick={this.handleReorganizeSources}>Reorganize</div>
                  <div onClick={this.handleUnfollowSources}>Unfollow</div>
                </div>
              </th>
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
