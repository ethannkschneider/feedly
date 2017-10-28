import React from 'react';
import { Link } from 'react-router-dom';

class SidebarCategoryItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showFeedsList: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderFeedTitles = this.renderFeedTitles.bind(this);
    this.renderArrowIcon = this.renderArrowIcon.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showFeedsList: !this.state.showFeedsList
    });
  }

  renderFeedTitles() {
    const cssClass = this.state.showFeedsList ?
    "sidebar feeds-list" : "hide-sidebar-feed";
    return this.props.feeds.map( (feed) => {
      return (
        <li key={feed.id} className={cssClass}>
          {feed.title}
        </li>
      );
    });
  }

  renderArrowIcon() {
    return this.state.showFeedsList ?
      <i className="material-icons">keyboard_arrow_down</i> :
      <i className="material-icons">keyboard_arrow_right</i>;
  }

  render() {
    return (
      <div className="sidebar-categories">
        <li onClick={this.handleClick}
          className="sidebar sidebar-category-name">
          {this.renderArrowIcon()}
          {this.props.collection.name}
        </li>
        {this.renderFeedTitles()}
      </div>
    );
  }
}

export default SidebarCategoryItem;
