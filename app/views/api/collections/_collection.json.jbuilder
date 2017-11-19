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
      json.partial! 'api/feeds/feed', feed: feed, articles: feed.articles.order(:date_published),
        collectionIds: collectionIds
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
