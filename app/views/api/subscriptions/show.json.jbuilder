json.feed do
  json.set! @subscription.feed.id do
    json.partial! 'api/feeds/feed', feed: @subscription.feed
  end
end

json.collection do
  json.set! @subscription.collection.id do
    json.partial! 'api/collections/collection', colleccion: @subscription.collection
  end
end
