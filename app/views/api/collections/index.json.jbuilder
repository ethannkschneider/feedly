@collections.each do |collection|
  json.set! collection.id do
    json.partial! 'api/collections/collection',
      colleccion: collection, feeds: collection.feeds,
      articles: collection.articles
  end
end
