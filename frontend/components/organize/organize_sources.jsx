import React from 'react';
import LoadingSpinner from '../loading_spinner';

class OrganizeSources extends React.Component {

  constructor(props) {
    super(props);

    this.cssClassOrganizeWrapper = this.cssClassOrganizeWrapper.bind(this);
    this.renderSources = this.renderSources.bind(this);
  }

  componentDidMount() {
    // this.props.turnOnLoading();
    // this.props.requestCollections()
    //   .then( (res) => this.props.turnOffLoading());
  }

  renderSources() {

  }

  cssClassOrganizeWrapper () {
    return (this.props.sidebarVisible) ?
      "organize-sources-sidebar-open" :
      "organize-sources-sidebar-closed";
  }
  render() {

    return (
      <div className={this.cssClassOrganizeWrapper()}>
        <div className="organize-sources-header">
          <h1>Organize Sources</h1>
          <h2>Following {this.props.feeds.length} sources</h2>
        </div>
      </div>
    );
  }
}

export default OrganizeSources;
