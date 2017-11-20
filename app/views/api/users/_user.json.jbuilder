json.extract! user, :id, :email, :first_name, :last_name, :feed_ids, :read_article_ids

json.image_url asset_path(user.image.url)

json.feeds_by_id do
  user.feeds.each do |feed|
    json.set! feed.id, true
  end
end

json.read_articles_by_id({})
json.read_articles_by_id do
  user.read_articles.each do |article|
    json.set! article.id, true
  end
end
