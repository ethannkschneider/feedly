class AddTeaserToArticles < ActiveRecord::Migration[5.1]
  def change
    add_column :articles, :teaser, :string
  end
end
