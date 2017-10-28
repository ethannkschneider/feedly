import React from 'react';
import { Link } from 'react-router-dom';
import SidebarCategoryItem from './sidebar_category_item';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.renderCollections = this.renderCollections.bind(this);
    this.handleOpenSidebar = this.handleOpenSidebar.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  handleOpenSidebar(e) {
    e.preventDefault();
    this.props.showSidebar();
  }

  handleCloseSidebar(e) {
    e.preventDefault();
    this.props.hideSidebar();
  }

  renderCollections() {
    let userFeeds = this.props.feeds;
    let categoryItems, categoryFeeds;
    categoryItems = this.props.collections.map( (collection) => {
      categoryFeeds = collection.feedIds.map( (id) => {
        return userFeeds[id];
      });
      return (<SidebarCategoryItem
        key={collection.id}
        collection={collection}
        feeds={categoryFeeds} />);
    });
    return categoryItems;
  }

  render() {
    if (this.props.loading) {
      return (
        <div>null</div>
      );
    } else if (!this.props.sidebarVisible) {
      return (
        <div className="sidebar-hidden">
          <div className="open-sidebar-button">
            <button onClick={this.handleOpenSidebar}>
              <i className="material-icons">reorder</i>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="sidebar sidebar-container">
          <div className="close-sidebar-button">
            <button onClick={this.handleCloseSidebar}>
              <i className="material-icons">keyboard_arrow_left</i>
            </button>
          </div>
          <ul className="sidebar sidebar-links">
            <li>
              <Link to="/"><i className="material-icons">
                rss_feed</i>Today</Link>
            </li>
            <li>
              <Link to="/"><i className="material-icons">
                bookmark_border</i>Read Later</Link>
            </li>
          </ul>

          <ul>
            <div className="sidebar sidebar-categories">
              <li>
                <Link to="/"><i className="material-icons">
                  view_headline</i>All</Link>
              </li>
            </div>
            {this.renderCollections()}
          </ul>
        </div>
      );
      }
  }
}

export default Sidebar;