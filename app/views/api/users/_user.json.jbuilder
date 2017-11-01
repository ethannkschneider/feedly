json.extract! user, :id, :email, :first_name, :last_name, :feed_ids

json.image_url asset_path(user.image.url)

json.feeds_by_id do
  user.feeds.each do |feed|
    json.set! feed.id, true
  end
end
