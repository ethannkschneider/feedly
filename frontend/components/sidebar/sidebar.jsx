import React from 'react';
import { Link } from 'react-router-dom';
import SidebarCategoryItem from './sidebar_category_item';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.renderCollections = this.renderCollections.bind(this);
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
    if (!this.props.loading) {
      return (
        <div className="sidebar sidebar-container">
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
    } else {
        return (
          <div>null</div>
        );
      }
  }
}

export default Sidebar;
