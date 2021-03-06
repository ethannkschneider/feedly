# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'nokogiri'
require 'open-uri'

CATEGORIES = [
  'News', 'Tech', 'Politics', 'Science', 'Sports',
  'Arts', 'Philosophy', 'Business', 'Entertainment',
  'Design', 'Marketing', 'Literature', 'Culture' ]

FEEDS = {
  'NYTimes News' => 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  'NYTimes Politics' => 'http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
  'NYTimes Local' => 'http://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml',
  'NYTimes Business' => 'http://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
  'NYTimes Technology' => 'http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
  'NYTimes Sports' => 'http://rss.nytimes.com/services/xml/rss/nyt/Sports.xml',
  'NYTimes Science' => 'http://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
  'NYTimes Arts' => 'http://rss.nytimes.com/services/xml/rss/nyt/Arts.xml',
  'NYTimes The Stone' => 'http://www.nytimes.com/svc/collections/v1/publish/www.nytimes.com/column/the-stone/rss.xml',
  'The Ringer' => 'https://www.theringer.com/rss/index.xml',
  'Boston Globe Local' => 'https://www.boston.com/tag/local-news/feed',
  'Boston Globe Politics' => 'https://www.boston.com/tag/politics/feed',
  'Politico Politics' => 'https://www.politico.com/rss/politics08.xml',
  'Wired News' => 'https://www.wired.com/feed/rss',
  'Tech Radar' => 'http://www.techradar.com/rss',
  'Polygon' => 'https://www.polygon.com/rss/index.xml',
  'The Intercept' => 'https://www.theintercept.com/feed/?lang=en',
  'Github' => 'https://www.github.com/blog.atom',
  "Scientific American Global" => 'http://rss.sciam.com/ScientificAmerican-Global?format=xml',
  'BBC News' => 'http://feeds.bbci.co.uk/news/rss.xml',
  'Boing Boing' => 'https://boingboing.net/feed/atom',
  'CBS Sports' => 'http://rss.cbssports.com/rss/headlines',
  'E! Online' => 'http://feeds.feedburner.com/EtsBreakingNews',
  'Time Magazine' => 'http://feeds2.feedburner.com/time/topstories',
  'AP Sports' => 'http://hosted.ap.org/lineups/SPORTSHEADS-rss_2.0.xml?SITE=VABRM&SECTION=HOME',
  'ESPN NEWS' => 'http://www.espn.com/espn/rss/news',
  'Time' => 'http://feeds.feedburner.com/time/newsfeed',
  'The Guardian > World' => 'https://www.theguardian.com/world/rss'

}

# User Seeds (Demo user remains the same)
User.destroy_all
demo_user = User.create!(email: "readly-demo@demo.com", password: "password", first_name: "Demo", last_name: "last_name")
20.times do
  User.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )
end

# Collection Seeds (Demo user's collections remain the same)
Collection.destroy_all
# Demo User:
CATEGORIES.each do |category|
  Collection.create!(name: category, user_id: demo_user.id)
end
# extra users
User.all[1..-1].each do |user|
  num_collections = rand(1...CATEGORIES.length)
  user_categories = CATEGORIES.sample(num_collections)
  user_categories.each do |category|
    Collection.create!(name: category, user_id: user.id)
  end
end

# Feed Seeds
Feed.destroy_all
FEEDS.each do |title, url|
  feed = Feed.create!(title: title, url: url)
  feed.set_image_url!
end

# Feed Subscriptions
Subscription.destroy_all
# demo user subscriptions (most realistic)

Subscription.create!(feed_id: Feed.find_by(title: "NYTimes News").id, collection_id: demo_user.collections.find_by(name: "News").id)
Subscription.create!(feed_id: Feed.find_by(title: "NYTimes Politics").id, collection_id: demo_user.collections.find_by(name: "Politics").id)
Subscription.create!(feed_id: Feed.find_by(title: "NYTimes Business").id, collection_id: demo_user.collections.find_by(name: "Business").id)
Subscription.create!(feed_id: Feed.find_by(title: "NYTimes Technology").id, collection_id: demo_user.collections.find_by(name: "Tech").id)
Subscription.create!(feed_id: Feed.find_by(title: "NYTimes Sports").id, collection_id: demo_user.collections.find_by(name: "Sports").id)
Subscription.create!(feed_id: Feed.find_by(title: "NYTimes Science").id, collection_id: demo_user.collections.find_by(name: "Science").id)
Subscription.create!(feed_id: Feed.find_by(title: "NYTimes Arts").id, collection_id: demo_user.collections.find_by(name: "Arts").id)
Subscription.create!(feed_id: Feed.find_by(title: "NYTimes The Stone").id, collection_id: demo_user.collections.find_by(name: "Philosophy").id)
Subscription.create!(feed_id: Feed.find_by(title: "The Ringer").id, collection_id: demo_user.collections.find_by(name: "Culture").id)
Subscription.create!(feed_id: Feed.find_by(title: "Boston Globe Local").id, collection_id: demo_user.collections.find_by(name: "News").id)
Subscription.create!(feed_id: Feed.find_by(title: "Boston Globe Politics").id, collection_id: demo_user.collections.find_by(name: "Politics").id)
Subscription.create!(feed_id: Feed.find_by(title: "Politico Politics").id, collection_id: demo_user.collections.find_by(name: "Politics").id)
# extra users
Collection.where('user_id != ?', demo_user.id).each do |collection|
  num_feeds = rand(1...FEEDS.length)
  collection_feeds = Feed.all.sample(num_feeds)
  collection_feeds.each do |feed|
    subscription = Subscription.new(feed_id: feed.id, collection_id: collection.id)
    unless collection.subscriptions.include?(subscription)
      subscription.save!
    end
  end
end







#
