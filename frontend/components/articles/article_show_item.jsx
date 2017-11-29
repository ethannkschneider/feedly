import React from 'react';
import { Link } from 'react-router-dom';

class ArticleShowItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isRead: this.props.isRead
    };
    this.cssBookmarkClass = this.cssBookmarkClass.bind(this);
    this.articleSummary = this.articleSummary.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
  }

  cssBookmarkClass() {
    return this.props.isBookmarked ?
      "bookmark collections-index-article-index-item-bookmarked" :
      "bookmark collections-index-article-index-item-not-bookmarked";
  }

  articleSummary() {
  // If some articles have nil for summary, we'll try to use their content.
  // the __html object is to allow html tags to get through
    return this.props.article.summary || { __html: this.props.article.content };
  }

  toggleRead() {
    if (!this.state.isRead) {
      this.props.createRead(this.props.article.id)
        .then( (res) => {
          this.setState({ isRead: true });
      });
    } else {
      this.props.deleteRead(this.props.article.id)
        .then( (res) => {
          this.setState({ isRead: false });
      });
    }
  }

  render() {
    let tempFavStyle = {
      display: "none"
    };
    return (
      <div className="expanded-article-show-wrapper">
        <div className="close-article-show-arrow"
          onClick={this.props.toggleExpand}>
          <i className="material-icons">keyboard_arrow_up</i>
        </div>
        <div className="expanded-article-show-header">
          <div className="expanded-article-show-headline">
            <a href={this.props.article.url} target="_blank"><h1>{this.props.article.headline}</h1></a>
          </div>
          <div className="expanded-article-show-byline">
            <h6><Link to={`/feeds/${this.props.article.feed_id}`}>
              <span className="expanded-article-show-feedname">{this.props.articleFeedName}</span></Link>
                 by {this.props.article.author}</h6>
            <button style={tempFavStyle} onClick={this.props.toggleBookmark}
              className={this.cssBookmarkClass()}>
              <i className="material-icons">
                {this.props.isBookmarked ? "bookmark" : "bookmark_border"}</i>
            </button>
            <div
              className="mark-as-read"
              onClick={this.toggleRead}>
              {this.state.isRead ? 'Mark as Unread' : 'Mark as Read'}
            </div>
          </div>
        </div>
        <div>
          <img src={this.props.article.image_url}
            className="expanded-article-show-image"
          />
        </div>
        {this.props.article.summary ?
          <div className="expanded-article-show-summary-content">
            <p>{this.articleSummary()}</p>
          </div> :
          <div
            key={this.props.article.id}
            dangerouslySetInnerHTML={this.articleSummary()}
            className="expanded-article-show-summary-content">
          </div>
        }
        <div className="expanded-article-show-visit-website">
          {this.props.article.url ?
            <a href={this.props.article.url} target="_blank"><button>
              Visit Website</button></a> : ""
          }
        </div>
      </div>
    );
  }
}


export default ArticleShowItem;
