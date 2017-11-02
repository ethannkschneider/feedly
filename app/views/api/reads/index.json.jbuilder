json.read_article_ids do
  json.array! current_user.read_article_ids
end

json.read_articles_by_id do
  current_user.read_article_ids.each do |id|
    json.set! id, true
  end
end
