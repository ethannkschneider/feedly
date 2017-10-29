json.extract! colleccion, :id, :name

json.feedIds do
  json.array! feeds.map(&:id)
end

json.feeds do
  feeds.each do |feed|
    json.set! feed.id do
      json.partial! 'api/feeds/feed', feed: feed, articles: feed.articles
    end
  end
end

json.articles do
  articles.each do |article|
    json.set! article.id do
      json.partial! 'api/articles/article', article: article
    end
  end
end
