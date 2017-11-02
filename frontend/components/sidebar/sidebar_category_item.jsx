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
    return this.props.feeds.map( (feed, idx) => {
      return (
        <li key={idx} className={cssClass}>
          <Link to={`/feeds/${feed.id}`}>
            <img src={feed.image_url} className="sidebar-favicon" />
            {feed.title}
          </Link>
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
        <li
          className="sidebar sidebar-category-name">
          <div onClick={this.handleClick}>
            {this.renderArrowIcon()}
          </div>
          <Link to={`/collections/${this.props.collection.id}`}>
            {this.props.collection.name}
          </Link>
        </li>
        {this.renderFeedTitles()}
      </div>
    );
  }
}

export default SidebarCategoryItem;
