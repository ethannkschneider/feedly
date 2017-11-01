@matchedFeeds.each do |feed|
  json.set! feed.id do
    json.extract! feed, :id, :title, :url, :image_url
  end
end
