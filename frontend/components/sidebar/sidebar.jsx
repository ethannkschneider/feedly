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
    let allFeeds = this.props.allFeeds;
    let categoryItems, categoryFeeds;

    categoryItems = this.props.collections.map( (collection) => {
      categoryFeeds = collection.feedIds.map( (id) => {
        return allFeeds[id];
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
        <div>{null}</div>
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
        <div className="sidebar-container">
          <div className="sidebar-content">
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
              <li className="recently-read-wrapper">
                <Link to="/recentlyread"><i className="material-icons">
                  history</i>Recently Read</Link>
              </li>
            </ul>

            <ul className="sidebar sidebar-categories">
              <li className="sidebar-category-feeds">
                <div>Feeds</div>
                <div className="sidebar-icon-gear">
                  <Link to="/organize">
                    <i className="material-icons">settings</i>
                  </Link>
                </div>
              </li>
              <li className="sidebar-category-name">
                <Link to="/"><i className="material-icons">
                  view_headline</i>All</Link>
              </li>
              {this.renderCollections()}
            </ul>
          </div>
          <div className="es-links">
            <div className="ethan">Site by Ethan Schneider</div>
            <ul className="icons">
              <li><a
               id="personal-site"
               href="https://ethannkschneider.github.io">Personal Site</a></li>
    					<li><a href="https://github.com/ethannkschneider"><i className="fa fa-github" aria-hidden="true"></i></a></li>
    					<li><a href="https://www.linkedin.com/in/ethannkschneider/"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
    					<li><a href="https://angel.co/ethan-schneider-66"><i className="fa fa-angellist" aria-hidden="true"></i></a></li>
    				</ul>
          </div>
        </div>
      );
      }
  }
}

export default Sidebar;
