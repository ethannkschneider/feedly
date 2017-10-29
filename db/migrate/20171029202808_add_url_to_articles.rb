class AddUrlToArticles < ActiveRecord::Migration[5.1]
  def change
    add_column :articles, :url, :text 
  end
end
