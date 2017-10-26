json.extract! collection, :id, :name

# later, add:
# json.rss_feeds do
#   json.partial 'api/rss_feeds/rss_feed', collection: collections.feeds, as: rss_feed
# end
