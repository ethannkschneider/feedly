class AddImageUrlToFeeds < ActiveRecord::Migration[5.1]
  def change
    add_column :feeds, :image_url, :text
    add_column :feeds, :last_fetched, :datetime
  end
end
