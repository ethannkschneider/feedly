# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

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
  'ESPN News' => 'http://www.espn.com/espn/rss/news',
  'The Ringer' => 'https://www.theringer.com/rss/index.xml',
  'Boston Globe Local' => 'https://www.boston.com/tag/local-news/feed',
  'Boston Globe Politics' => 'https://www.boston.com/tag/politics/feed',
  'Politico Politics' => 'https://www.politico.com/rss/politics08.xml'
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
User.all.each do |user|
  num_collections = rand(1...CATEGORIES.length)
  user_categories = CATEGORIES.sample(num_collections)
  user_categories.each do |category|
    Collection.create!(name: category, user_id: user.id)
  end
end

# Feed Seeds
Feed.destroy_all
FEEDS.each do |title, url|
  Feed.create!(title: title, url: url)
end

# Feed Subscriptions
Subscription.destroy_all
Collection.all.each do |collection|
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
