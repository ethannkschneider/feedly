json.extract! colleccion, :id, :name

json.feedIds do
  colleccion.feeds.map(&:id)
end

json.feeds do
  colleccion.feeds.each do |feed|
    json.set! feed.id do
      json.partial! 'api/feeds/feed', feed: feed
    end
  end
end
