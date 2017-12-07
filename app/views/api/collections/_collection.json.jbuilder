json.extract! colleccion, :id, :name

json.feedIds do
  json.array! feeds.map(&:id)
end

json.feeds do
  feeds.each do |feed|
    json.set! feed.id do
      collectionIds = []
      current_user.subscriptions.each do |s|
        collectionIds << s.collection_id if s.feed_id == feed.id
      end
      json.partial! 'api/feeds/feed', feed: feed,
        collectionIds: collectionIds
    end
  end
end
