json.extract! feed, :title, :url, :id, :image_url

json.articleIds do
  json.array! articles.map(&:id)
end
