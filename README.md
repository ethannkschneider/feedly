# Readly

[Live Demo](www.readly.fun)

Readly is an RSS feed aggregator modeled after [Feedly](www.feedly.com). Users can subscribe  
to feeds from their favorite websites and view the most up-to-date content,  
all in one place. Users organize their feeds in collections according to  
topic, e.g. News, Tech, or Sports.


Demo:

(insert gifs here)

## Technologies Used

* Ruby on Rails 5.1.4
    * Feedjira
    * Sanitize
* PostgreSQL  
* React.js  
    * React Router  
    * React Dropdown  
* Redux  
* Webpack
* Babel  
* Sass
* Amazon Web Services (AWS)  
* Paperclip  


## MVP Features  

* Users
    * Frontend and backend authentication using BCrypt
    * Profile picture upload using Paperclip
* RSS Feeds
    * Users can follow and unfollow feeds
    * Users can fetch and view recent articles in their feeds
* Collections  
    * Users can create, view, and delete custom collections of RSS feeds
    * Users can add and remove feeds from their collections
* Articles
    * Users can view recent articles in their collections
    * Article views contain links to their original website
* Search
    * Users can search for RSS feeds by name
    * Users can follow or unfollow feeds in their search results
* Reads
    * Users can mark articles as 'read' or 'unread'
    * Users can view recently read articles

## RSS Feeds
* Feeds are added to a Feeds table on the backend database
* Feeds require a url and a name to be created; other attributes are gotten via the [Feedjira](http://feedjira.com/) gem
* Feed URLs usually .xml links that can be fetched and parsed by web-scraping programs


## Collections
* Collections are stored in a Collections table on the backend
* Each collection belongs to one user and can have many feeds associated with it
* The collections index serves as a user's homepage
* Upon login, collection data is fetched from the backend via an ajax request
    * Associated feed and article data is also fetched  
    * (Note: CSS classes are dynamically generated based on the presence of the sidebar)
```javascript
componentDidMount() {
  this.props.turnOnLoading();
  this.props.requestCollections()
    .then( (res) => this.props.turnOffLoading());
}

renderCollectionItems() {
  let collectionItems = null;
  if (!this.props.loading) {
    collectionItems = this.props.collections.map( (collection) => {
      return (
        <CollectionIndexItem key={collection.id} collection={collection} />
        );
    });
  }
  return collectionItems;
}

cssClassIndexWrapper () {
  return (this.props.sidebarVisible) ?
    "collection-index-sidebar-open" :
    "collection-index-sidebar-closed";
}

render() {
  let collectionItems = this.renderCollectionItems();
  return (
    <div className={this.cssClassIndexWrapper()}>
      {this.props.loading ?
        <div className="collection-index-spinner">
          <LoadingSpinner />
        </div>
        :
        <div className="collection-index-wrapper">
          <div className="today-header"><h1>Today</h1></div>
          <div className="collection-index-loaded">
            {collectionItems}
          </div>
        </div>
      }
    </div>
  );
}
```

## Articles
* Articles are stored on the backend in an Articles table; they belong to a Feed
* New articles are added to the database via the rake task `fetch_articles`
    * `fetch_articles` uses the Feedjira gem to create an instance of the `Feedjira::Feed` object  
        * It does this by calling `Feedjira::Feed.fetch_and_parse` and passing in the feed url  
    * Columns in the article database are then populated via the `entries` from the `Feedjira::Feed` object  
    * Feeds vary in how they respond to `Feedjira::Feed.fetch_and_parse`
        * Article content is usually stored as `.content` or `.summary`
        * Article content is then sanitized (stripped of html tags) so that we only display text:
```javascript
content = article.content ? Sanitize.fragment(article.content) : nil
summary = article.summary ? Sanitize.fragment(article.summary) : nil
```
* On the frontend, articles can be seen as either headline or expanded view
    * Users toggle the view type by clicking on the article:  

![Article views](https://github.com/ethannkschneider/feedly/blob/master/docs/readly-gif-1.gif)

## Search
* To add feeds to their collections, users can search through all of feeds stored on the backend
* The search is implemented on the frontend by using a controlled React Component; the backend is a simple SQL query.
    * The controlled component uses the following `onChange` callback to search the backend:
    ```javascript
    linkInputToState(e) {
      this.setState({ searchText: e.target.value });
      this.props.turnOnLoading();
      FeedUtil.fetchFeeds(e.target.value)
        .then( (fetchedFeeds) => {
          this.props.turnOffLoading();
          this.setState({ searchResults: Object.values(fetchedFeeds)});
        });
    }
    ```
* Each search result renders a 'follow' or 'unfollow' button by checking whether a user already follows the feed   
* This check is done in constant time, since we store a user's followed feeds in the session slice of the Redux state as a javascript object:  
```javascript
feeds_by_id: {361: true, 375: true, 394: true}
```
![Organizing sources and searching for feeds](https://github.com/ethannkschneider/feedly/blob/master/docs/readly-gif-3.gif)
## Reads
* After reading an article, users can mark an article as 'read' (or 'unread')
* When a user 'reads' an article, a new entry is added to the backend Reads table  
    * This is a join table that simply tracks `user_id` and `article_id`
* Users can view their previously read articles in the Recently Read page on the frontend:
![Recently read](https://github.com/ethannkschneider/feedly/blob/master/docs/readly-gif-2.gif)


## Future Directions
* Smarter SQL queries to provide users with a more diverse smattering of articles upon logging in
* Allow users to favorite an article (this should be similar to implementing the Reads feature)
* Better sanitized article content and parsed images; utilize more Ruby gems to fine-tune article data
* Refresh button -- allow users to click a button to fetch recent articles without having to refresh their browser
