json.extract! feed, :title, :url, :id, :image_url

json.articleIds do
  json.array! articles.map(&:id)
end

json.collectionIds do
  json.array! collectionIds
end
