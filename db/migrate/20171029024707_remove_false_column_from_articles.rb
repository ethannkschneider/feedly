class RemoveFalseColumnFromArticles < ActiveRecord::Migration[5.1]
  def change
    remove_column :articles, :false
  end
end
