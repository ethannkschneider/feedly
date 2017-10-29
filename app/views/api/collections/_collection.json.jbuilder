json.extract! colleccion, :id, :name

json.feedIds do
  json.array! feeds.map(&:id)
end

json.feeds do
  feeds.each do |feed|
    json.set! feed.id do
      json.partial! 'api/feeds/feed', feed: feed
    end
  end
end
